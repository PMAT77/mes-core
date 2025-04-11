<template>
  <view>
    <wd-input
      v-model="getValue"
      type="text"
      :prop="prop"
      :rules="rules"
      :label="label"
      :label-width="labelWidth"
      :placeholder="placeholder"
      :suffix-icon="readonly ? '' : getValue ? 'error-fill' : 'arrow-right'"
      :readonly="readonly"
      :disabled="disabled"
      :align-right="alignRight"
      @focus="show = true"
      @clicksuffixicon="onClearValue"
    />

    <wd-popup v-model="show" position="bottom" :z-index="100" :="$attrs">
      <view class="flex flex-col">
        <view class="flex-grow-1">
          <z-paging
            ref="paging"
            v-model="dataList"
            safe-area-inset-bottom
            back-to-top-bottom="80rpx"
            show-loading-more-when-reload
            :auto-show-back-to-top="true"
            :auto="true"
            :concat="true"
            :loading-more-title-custom-style="{
              'font-size': '26rpx',
            }"
            :fixed="false"
            height="50vh"
            @query="queryList"
          >
            <template #top>
              <view class="flex justify-center items-center h-70px relative">
                <wd-text text="请选择" size="16px" bold />

                <wd-button
                  class="!absolute right-10px"
                  type="icon"
                  icon="close"
                  size="small"
                  @click="show = false"
                />
              </view>
              <wd-search
                v-model="searchValue"
                hide-cancel
                @change="debouncedFn"
                @clear="debouncedFn"
              />
            </template>
            <wd-radio-group v-model="checkValue" cell>
              <wd-radio :value="item[valueFields]" v-for="(item, index) in dataList" :key="index">
                {{ labelFields ? item[labelFields] : item.name }}
              </wd-radio>
            </wd-radio-group>
          </z-paging>
        </view>

        <view class="w-100% px-15px pt-24px pb-24px box-border">
          <wd-button class="w-100%" size="large" :round="true" @click="handleConfirm">
            确认
          </wd-button>
        </view>
      </view>
    </wd-popup>
  </view>
</template>

<script lang="ts" setup>
import { httpGet } from '@/utils/http'
import { useDebounceFn } from '@vueuse/core'
import { computed, ref } from 'vue'

const paging = ref(null)

type Props = {
  api: string
  prop?: string
  disabled?: boolean
  readonly?: boolean
  rules?: any
  alignRight?: boolean
  label?: string
  labelWidth?: string
  placeholder?: string
  immediate?: boolean
  labelFields?: string
  valueFields?: string
  searchFields?: string
}

const props = withDefaults(defineProps<Props>(), {
  immediate: true,
  valueFields: 'id',
})

const emits = defineEmits(['confirm', 'clear'])

const show = defineModel('show', {
  default: false,
})

const value = defineModel('modelValue', {
  default: '',
})

const checkValue = defineModel('checkValue', {
  default: '',
})

const searchValue = ref('')

const dataList = ref([])

const getValue = computed(() => {
  const labelFields = props.labelFields ? props.labelFields : 'name'

  const values = dataList.value?.find((item) => item[props.valueFields] === value.value)

  if (values) {
    return values[labelFields]
  }

  return ''
})

/**
 * @method 请求分页数据
 */
function queryList(pageNo, pageSize) {
  if (!props.api) {
    paging.value?.complete(false)
    return
  }

  const { data: orderData, run: getList } = useRequest<any>(() =>
    httpGet<any>(props.api, {
      [props.searchFields ? props.searchFields : 'name']: `*${searchValue.value}*`,
      pageNo,
      pageSize,
    }),
  )

  getList()
    .then(() => {
      checkValue.value = ''
      paging.value?.complete(orderData.value.records)
    })
    .catch((err) => {
      console.log('其他入库列表加载错误', err)
      paging.value?.complete(false)
    })
}

// 搜索防抖
const debouncedFn = useDebounceFn(() => paging.value?.reload(), 300)

function handleConfirm() {
  value.value = checkValue.value

  emits(
    'confirm',
    dataList.value?.find((item) => item[props.valueFields] === value.value),
  )
  show.value = false
}

function onClearValue() {
  if (!getValue.value) return
  value.value = ''
  checkValue.value = ''
  emits('clear')
}

onShow(async () => {
  if (props.immediate) {
    const { data: orderData, run: getList } = useRequest<any>(() =>
      httpGet<any>(props.api, {
        [props.searchFields ? props.searchFields : 'name']: `*${searchValue.value}*`,
        pageNo: 1,
        pageSize: 99999,
      }),
    )

    getList()
      .then(() => {
        checkValue.value = value.value
        dataList.value = orderData.value.records
      })
      .catch((err) => {
        console.log('列表加载错误', err)
        paging.value?.complete(false)
      })
  }
})
</script>

<style></style>
