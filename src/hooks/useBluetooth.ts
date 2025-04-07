import { ref } from 'vue'

// 自定义类型声明
interface BluetoothAdapter {
  getDefaultAdapter(): any // 根据实际返回值调整类型
}

interface UUID {
  fromString(uuid: string): any // 根据实际返回值调整类型
}

/* 使用蓝牙打印 */
export function useBluetoothPrinter() {
  const device = ref(null)
  const isPrinting = ref(false)

  const printSomething = async (sb: (outputStream: any) => Promise<void>) => {
    try {
      // const main = plus.android.runtimeMainActivity()

      // 导入类并确保类型匹配
      const BluetoothAdapter = plus.android.importClass(
        'android.bluetooth.BluetoothAdapter',
      ) as unknown as BluetoothAdapter
      const UUIDClass = plus.android.importClass(
        'java.util.UUID',
      ) as unknown as PlusAndroidClassObject

      // 确保设备地址存在
      if (!device.value?.address) {
        throw new Error('未选择蓝牙设备')
      }

      // 初始化蓝牙适配器
      const uuidString = '00001101-0000-1000-8000-00805F9B34FB'
      const uuid = plus.android.invoke(UUIDClass, 'fromString', uuidString) // 确保 UUIDClass 类型正确
      const BAdapter = BluetoothAdapter.getDefaultAdapter()
      const remoteDevice = BAdapter.getRemoteDevice(device.value.address)

      plus.android.importClass(remoteDevice)
      const bluetoothSocket = remoteDevice.createInsecureRfcommSocketToServiceRecord(uuid)
      plus.android.importClass(bluetoothSocket)

      try {
        if (!bluetoothSocket.isConnected()) {
          // 连接设备（建议添加超时处理）
          await new Promise((resolve, reject) => {
            bluetoothSocket.connect()
            const timeoutId = setTimeout(() => {
              if (!bluetoothSocket.isConnected()) {
                reject(new Error('连接超时'))
              } else {
                resolve(true) // 明确传递参数
              }
            }, 5000) // 5秒超时

            // 如果连接成功，则清除超时
            const checkConnectionInterval = setInterval(() => {
              if (bluetoothSocket.isConnected()) {
                clearTimeout(timeoutId)
                clearInterval(checkConnectionInterval)
                resolve(true) // 明确传递参数
              }
            }, 100)
          })
        }

        if (bluetoothSocket.isConnected()) {
          console.log('设备已连接，开始发送打印文件')
          const outputStream = bluetoothSocket.getOutputStream()
          plus.android.importClass(outputStream)

          // 执行打印回调
          if (typeof sb === 'function') {
            await sb(outputStream)
          }

          // 关闭连接
          bluetoothSocket.close()
          console.log('设备已关闭')
        }
      } catch (error) {
        console.error('通信错误:', error)
        uni.showToast({ title: `打印失败: ${error.message}`, icon: 'none' })
        if (bluetoothSocket && bluetoothSocket.close) {
          bluetoothSocket.close()
        }
      }
    } catch (error) {
      console.error('打印初始化失败:', error)
      uni.showToast({ title: error.message || '打印错误', icon: 'none' })
    }
  }

  return {
    device,
    isPrinting,
    printSomething,
  }
}
