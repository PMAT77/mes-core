export const usePrint = () => {
  const print = (macAddress: string, data: string) => {
    if (!macAddress) {
      uni.showModal({
        title: '提示',
        content: '请选择蓝牙打印机',
        showCancel: false,
      })
      return
    }
    if (!data) {
      uni.showModal({
        title: '提示',
        content: '请提供打印数据.',
        showCancel: false,
      })
      return
    }

    console.log('打印设备MAC地址', macAddress)
    console.log('打印数据', data)

    const main = plus.android.runtimeMainActivity()
    const BluetoothAdapter = plus.android.importClass('android.bluetooth.BluetoothAdapter') as any
    const UUID = plus.android.importClass('java.util.UUID') as any
    const uuid = UUID.fromString('00001101-0000-1000-8000-00805F9B34FB')
    const BAdapter = BluetoothAdapter.getDefaultAdapter()
    if (!BAdapter.isEnabled()) {
      uni.showModal({
        title: '提示',
        content: '蓝牙处于关闭状态，是否打开？',
        success: (res) => {
          if (res.confirm) {
            BAdapter.enable()
          }
        },
      })
      console.log('蓝牙处于关闭状态，正在打开...')
      return
    }

    let device = BAdapter.getRemoteDevice(macAddress)
    plus.android.importClass(device)
    const bluetoothSocket = device.createInsecureRfcommSocketToServiceRecord(uuid)
    plus.android.importClass(bluetoothSocket)
    if (!bluetoothSocket.isConnected()) {
      console.log('检测到设备未连接，尝试连接....')
      bluetoothSocket.connect()
    }
    if (bluetoothSocket.isConnected()) {
      console.log('设备已连接')
      const outputStream = bluetoothSocket.getOutputStream()
      plus.android.importClass(outputStream)
      outputStream.write([0x1b, 0x40]) // 打印复位
      outputStream.flush()

      const bytes = plus.android.invoke(data, 'getBytes', 'gbk') /* utf-8 */

      outputStream.write(bytes)
      outputStream.flush()

      device = null // 这里关键
      bluetoothSocket.close()
    }
  }

  return {
    print,
  }
}
