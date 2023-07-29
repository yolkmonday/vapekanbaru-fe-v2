import {
  defineStore
} from 'pinia'

import {
  axiosPost,
  axiosGet
} from '../../composables/useAxios'

export const usePush = defineStore('push', {
  // a function that returns a fresh state
  state: () => ({
    data: [],
    loading: false,
    error: ""
  }),
  actions: {
    async actionPushOvo(trx_id, hp) {
      try {
        this.loading = true
        this.error = ''
        const res = await axiosPost('/v1/payment/ovo-push',{
          trx_id,
          hp
        })
        this.loading = false
        if (res.data.status) {
          localStorage.setItem("ovo_push",trx_id)
        }
        return res
      } catch (error) {
        this.loading = false
        this.error = error
        return error
      }
    },
    async repushOvo(trx_id, hp) {
      try {
        this.loading = true
        this.error = ''
        const res = await axiosPost('/v1/payment/respush-ovo',{
          trx_id,
          hp
        })
        this.loading = false
        return res
      } catch (error) {
        this.loading = false
        this.error = error
        return error
      }
    }

  },
})
