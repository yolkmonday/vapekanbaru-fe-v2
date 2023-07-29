import {
  defineStore
} from 'pinia'

import {
  axiosPost,
  axiosGet
} from '../../composables/useAxios'

export const useTransaksi = defineStore('transaksi', {
  // a function that returns a fresh state
  state: () => ({
    data: [],
    loading: false,
    error: "",
    loadingPayment: false,
    errorPayment: "",
    loadingCheck: false
  }),
  actions: {
    async getData(trx_id, firstLoad) {
      try {
        if (firstLoad) {
          this.loading = true
        }
        this.loadingCheck = true
        this.error = ''
        const res = await axiosGet('/v1/pay?trx_id=' + trx_id)
        this.loadingCheck = false
        if (firstLoad) {
            this.loading = false
        }
        if (res.data.status) {
          this.data =res.data.data
        } else {
          this.error = res.data.error_msg
        }
        return res.data
      } catch (error) {
        this.loading = false
        this.loadingCheck = false
        this.error = error
        return error
      }
    },
    async getPayment(trx_id) {
      // payment/detail/T230330SVLF000021
      try {
        this.loadingPayment = true
        this.error = ''
        const res = await axiosGet('/v1/payment/detail/'+trx_id)
          this.loadingPayment = false
        if (res.data.status) {
          this.payment =res.data.data
        } else {
          this.errorPayment = res.data.error_msg
        }
      } catch (error) {
        this.loadingPayment = false
        this.errorPayment = error
      }
    }

  },
})
