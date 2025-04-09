// usePrint.ts
// import { getStorageSync, showModal, showToast } from '@dcloudio/uni-app'

// 常量定义
const BLUETOOTH_UUID = '00001101-0000-1000-8000-00805F9B34FB'
const WIFI_PRINTER_PORT = 9100
const DEFAULT_ENCODING = 'gbk'

// 类型定义
interface PrintData {
  [key: string]: any
  BcdType?: string
}

interface PrinterConfig {
  macAddress?: string
  printerIp?: string
  printerType?: '1' | '2'
}

class PrintService {
  private static instance: PrintService
  private bluetoothAdapter: any
  private uuid: any
  private device: any
  private bluetoothSocket: any

  private constructor() {
    this.initBluetoothDependencies()
  }

  public static getInstance(): PrintService {
    if (!PrintService.instance) {
      PrintService.instance = new PrintService()
    }
    return PrintService.instance
  }

  private initBluetoothDependencies(): void {
    if (typeof plus !== 'undefined') {
      const BluetoothAdapter = plus.android.importClass('android.bluetooth.BluetoothAdapter') as any
      const UUID = plus.android.importClass('java.util.UUID') as any
      this.bluetoothAdapter = BluetoothAdapter.getDefaultAdapter()
      this.uuid = UUID.fromString(BLUETOOTH_UUID)
    }
  }

  // 核心打印方法
  public async print(macAddress: string, data: string): Promise<void> {
    if (!macAddress) throw new Error('请选择蓝牙打印机')
    if (!data) throw new Error('请提供打印数据')

    console.log('macAddress', macAddress)

    try {
      await this.connectBluetooth(macAddress)
      this.sendPrintData(data)
    } finally {
      this.disconnect()
    }
  }

  // 蓝牙连接管理
  private async connectBluetooth(macAddress: string): Promise<void> {
    if (!this.bluetoothAdapter.isEnabled()) {
      await this.requestEnableBluetooth()
    }

    try {
      // 1. 获取设备对象
      this.device = this.bluetoothAdapter.getRemoteDevice(macAddress)
      console.log('Device:', JSON.stringify(this.device))

      // 2. 尝试直接创建 Socket
      try {
        this.bluetoothSocket = this.device.createInsecureRfcommSocketToServiceRecord(this.uuid)
      } catch (primaryError) {
        console.warn('标准方法失败，尝试反射调用:', primaryError)

        // 3. 反射调用备用方法
        // const deviceClass = plus.android.getClass(this.device)
        // const createSocketMethod = deviceClass.getMethod(
        //   'createInsecureRfcommSocket',
        //   plus.android.getClass('java.lang.Integer'),
        // )
        // this.bluetoothSocket = createSocketMethod.invoke(this.device, 1)
      }

      // 4. 最终检查
      if (!this.bluetoothSocket) {
        throw new Error('所有创建Socket的方法均失败')
      }

      // 5. 连接设备
      if (!this.bluetoothSocket.isConnected()) {
        await executeWithTimeout(() => this.bluetoothSocket.connect(), 5000, '连接超时')
      }
    } catch (error) {
      console.error('蓝牙连接失败:', error)
      throw new Error(`连接失败: ${error.message}`)
    }
  }

  private async requestEnableBluetooth(): Promise<void> {
    return new Promise((resolve) => {
      uni.showModal({
        title: '提示',
        content: '蓝牙处于关闭状态，是否打开？',
        success: ({ confirm }) => {
          if (confirm) {
            this.bluetoothAdapter.enable()
            resolve()
          }
        },
      })
    })
  }

  // 数据发送
  private sendPrintData(data: string): void {
    const outputStream = this.bluetoothSocket?.getOutputStream()
    console.log('outputStream', outputStream)
    const bytes = plus.android.invoke(data, 'getBytes', DEFAULT_ENCODING)
    outputStream?.write(bytes)
    outputStream?.flush()
  }

  // 连接清理
  private disconnect(): void {
    if (this.bluetoothSocket?.isConnected()) {
      this.bluetoothSocket.close()
    }
    this.device = null
    this.bluetoothSocket = null
  }

  // 公共工具方法
  public isNullOrEmpty(obj: any): boolean {
    return obj === null || obj === undefined || (typeof obj === 'string' && obj.trim().length === 0)
  }

  public getValueOrEmpty(obj: any): string {
    return this.isNullOrEmpty(obj) ? '' : obj.toString()
  }

  // 标签生成器
  public generateLabelTemplate(data: PrintData, templateType: string): string {
    const generators: { [key: string]: (data: PrintData) => string } = {
      Y: this.generateYTemplate,
      // Z: this.generateZTemplate,
      // J: this.generateJTemplate,
      // S: this.generateSTemplate,
      // CVTE: this.generateCVTETemplate,
    }

    return generators[templateType]?.(data) || this.generateDefaultTemplate(data)
  }

  private generateDefaultTemplate(data: PrintData): string {
    const currentDate = new Date()
    const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
    const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`

    let template = `打印时间: ${formattedDate} ${formattedTime}\n`
    template += `打印数据:\n`

    for (const key in data) {
      // 使用 Reflect.has 进行安全检查
      if (Reflect.has(data, key)) {
        template += `${key}: ${data[key]}\n`
      }
    }

    return template
  }

  private generateYTemplate(data: PrintData): string {
    // Y 类型标签的具体实现
    //     !0 200 200 210 1
    // TEXT 4 0 30 40 Hello World
    // FORM
    // PRINT
    return `
    !0 200 200 210 1 /r/n
    TEXT 4 0 30 40 Hello World /r/n
    FORM /r/n
    PRINT /r/n
    `
  }

  // 其他模板生成方法...
}

// 实例导出
export const printService = PrintService.getInstance()

// 辅助工具函数
// export const checkPrinterReady = (): boolean => {
//   const config = getPrinterConfig()
//   if (config.printerType === '2') return checkBluetoothPrinter(config.macAddress)
//   return checkWifiPrinter(config.printerIp)
// }

// const getPrinterConfig = (): PrinterConfig => ({
//   macAddress: getStorageSync('ble_printerId'),
//   printerIp: getStorageSync('printerip'),
//   printerType: getStorageSync('printer_type') || '1',
// })

const checkBluetoothPrinter = (macAddress?: string): boolean => {
  if (!macAddress) {
    uni.showToast({ title: '请选择蓝牙打印机', icon: 'none' })
    return false
  }
  return true
}

const checkWifiPrinter = (ip?: string): boolean => {
  if (!ip) {
    uni.showToast({ title: '请配置WiFi打印机IP' })
    return false
  }
  return true
}

// 平台兼容方法
const executeWithTimeout = async <T>(
  task: () => T,
  timeout: number,
  errorMsg: string,
): Promise<T> => {
  return Promise.race([
    task(),
    new Promise<T>((_resolve, reject) => setTimeout(() => reject(new Error(errorMsg)), timeout)),
  ])
}
