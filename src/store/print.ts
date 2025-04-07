import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface BluetoothDevice {
  name: string
  address: string
  status: string
  uuids: number
  op: string
}

export const usePrintStore = defineStore(
  'Print',
  () => {
    const device = ref<BluetoothDevice>({
      name: '暂无设备',
      address: '9527',
      status: '',
      uuids: -1,
      op: '',
    })

    const deviceList = ref<BluetoothDevice[]>([
      {
        name: '暂无设备',
        address: '9527',
        status: '',
        uuids: -1,
        op: '',
      },
    ])

    const clearDeviceList = () => {
      device.value = {
        name: '暂无设备',
        address: '9527',
        status: '',
        uuids: -1,
        op: '',
      }

      deviceList.value = [
        {
          name: '暂无设备',
          address: '9527',
          status: '',
          uuids: -1,
          op: '',
        },
      ]
    }

    /* 初始化打印设备列表 */
    const initPrinter = () => {
      try {
        // 清空旧数据
        clearDeviceList()

        // Android 原生交互部分
        const main = plus.android.runtimeMainActivity() as any // 断言为 any 类型
        if (!main || typeof main.getSystemService !== 'function') {
          throw new Error('getSystemService 方法不可用')
        }

        const Context = plus.android.importClass('android.content.Context') as any
        const BManager = main.getSystemService(Context.BLUETOOTH_SERVICE)
        plus.android.importClass(BManager)

        const BAdapter = BManager.getAdapter()
        plus.android.importClass(BAdapter)

        const lists = BAdapter.getBondedDevices()
        plus.android.importClass(lists)

        const iterator = lists.iterator()
        plus.android.importClass(iterator)

        // 遍历设备
        while (iterator.hasNext()) {
          const d = iterator.next()
          plus.android.importClass(d)

          deviceList.value.push({
            name: d.getName(),
            address: d.getAddress(),
            status: d.getBondState(),
            uuids: d.getUuids(),
            op: d,
          })
        }
      } catch (error) {
        console.error('蓝牙初始化失败:', error)
        uni.showToast({ title: '蓝牙不可用', icon: 'none' })
      }
    }

    const selectDevice = (selectedDeviceId: number) => {
      device.value = deviceList.value.find((item) => item.uuids === selectedDeviceId)
      uni.showToast({ title: `已选择：${device.value.name}`, icon: 'none' })
    }

    return {
      device,
      deviceList,
      initPrinter,
      selectDevice,
      clearDeviceList,
    }
  },
  {
    persist: true,
  },
)
