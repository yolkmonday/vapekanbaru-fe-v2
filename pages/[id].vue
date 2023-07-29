<template>
  <div class="min-h-screen min-w-screen bg-primary overflow-hidden">
    <div
      class="h-[92vh] max-w-[480px] bg-white md:mt-4 mx-auto rounded-b-xl md:rounded-xl relative"
    >
      <div v-if="!transaksi.error && !transaksi.loading">
        <div class="p-4">
          <div class="text-center">
            <div class="mt-4">
              <div
                class="h-14 w-14 mx-auto rounded-full bg-gray-300 flex items-center justify-center"
              >
                <img
                  v-if="transaksi.data.data.logo_toko"
                  :src="transaksi.data.data.logo_toko"
                  alt=""
                />
                <icon
                  v-if="!transaksi.data.data.logo_toko"
                  class="text-gray-600 text-[40px]"
                  name="ic:round-store"
                />
              </div>
            </div>
            <div class="w-full text-center flex justify-center">
              <div class="mt-2 font-bold text-sm flex items-center gap-1">
                {{ transaksi.data.data.nama_toko }}
                <icon
                  class="text-blue-600 text-xl"
                  name="solar:verified-check-bold"
                />
              </div>
            </div>
          </div>
          <div class="mt-4">
            <span class="text-xs text-gray-500">Total Pembayaran</span>
            <span class="text-xl block font-bold">{{
              useRupiah(transaksi.data.data.jumlah_bayar)
            }}</span>
          </div>
          <div class="mb-2 flex justify-between items-center">
            <div class="flex text-xs gap-2">
              <span class="text-gray-500"> ID Transaksi </span>
              <span> #{{ transaksi.data.data.trx_id }}</span>
            </div>
            <button
              class="text-xs text-blue-500"
              @click.prevent="
                showDetail ? (showDetail = false) : (showDetail = true)
              "
            >
              Detail
              <icon
                v-if="!showDetail"
                class="text-xl"
                name="eva:chevron-down-fill"
              />
              <icon
                v-if="showDetail"
                class="text-xl"
                name="eva:chevron-up-fill"
              />
            </button>
          </div>
          <!-- DETAIL PAYMENT -->
          <div class="mb-3" v-if="showDetail">
            <div class="p-3 rounded-lg bg-gray-100 mb-2">
              <h3 class="font-bold text-sm text-primary">Customer</h3>
              <div class="text-gray-600 text-sm">
                <p class="flex items-center gap-1">
                  <icon name="solar:user-circle-bold" />
                  {{ transaksi.data.data.cs_name }}
                </p>
                <p class="flex items-center gap-1">
                  <icon name="solar:mailbox-bold" />

                  {{ transaksi.data.data.cs_email }}
                </p>
                <p class="flex items-center gap-1">
                  <icon name="solar:phone-rounded-bold" />
                  {{ transaksi.data.data.cs_phone }}
                </p>
              </div>
            </div>
            <div class="p-3 rounded-lg bg-gray-100">
              <h3 class="font-bold text-sm text-primary">Rincian Transaksi</h3>
              <div class="text-gray-600 text-sm">
                <div
                  v-for="(p, i) in transaksi.data.detail"
                  :key="i"
                  class="flex justify-between items-center border-b py-2"
                >
                  <div>
                    <p class="text-sm">
                      {{ p.name }} ({{ p.product_code || '-' }})
                    </p>
                  </div>
                  <div class="font-bold text-gray-700">
                    {{ useRupiah(p.price) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- END DETAIL PAYMENT -->
          <div class="pt-3 border-t">
            <div class="text-xs text-gray-600">Metode Pembayaran</div>
            <div>
              <img
                v-if="transaksi.data.data.logo_payment_channel"
                class="h-6 my-2"
                :src="transaksi.data.data.logo_payment_channel"
                alt=""
              />
              <div
                v-if="!transaksi.data.data.logo_payment_channel"
                class="text-xl font-bold"
              >
                {{ transaksi.data.data.nama_payment_channel }}
              </div>
            </div>
          </div>

          <!-- GET PAYMENT -->
          <div
            v-if="
              transaksi.data.data.status !== 'Success' &&
              transaksi.data.data.status !== 'Completed'
            "
          >
            <div v-if="!transaksi.loadingPayment">
              <!-- QR IMAGE -->
              <div class="my-8" v-if="transaksi.payment.qr_link">
                <img
                  class="w-64 mx-auto"
                  :src="transaksi.payment.qr_link"
                  alt=""
                />
              </div>
              <!-- END QR IMAGE -->

              <!-- NOMOR VA -->
              <div class="my-8" v-if="transaksi.payment.nomor_va">
                <div class="mb-2">
                  <p class="text-center text-sm">Nomor Virtual Akun</p>
                  <div class="text-center flex items-center">
                    <div
                      class="font-bold text-xl gap-1 cursor-pointer flex items-center mx-auto"
                      @click.prevent="copyText(transaksi.payment.nomor_va)"
                    >
                      <div>
                        {{ transaksi.payment.nomor_va }}
                      </div>

                      <div class="text-gray-600 flex items-center">
                        <icon class="text-xs" name="solar:copy-bold-duotone" />
                        <span class="text-xs">copy</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <p class="text-center text-sm">Total Bayar</p>
                  <div class="text-center flex items-center">
                    <div
                      class="font-bold text-xl gap-1 cursor-pointer flex items-center mx-auto"
                      @click.prevent="copyText(transaksi.payment.total_bayar)"
                    >
                      <div>
                        {{ useRupiah(transaksi.payment.total_bayar) }}
                      </div>

                      <div class="text-gray-600 flex items-center">
                        <icon class="text-xs" name="solar:copy-bold-duotone" />
                        <span class="text-xs">copy</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- END NOMOR VA -->
            </div>
            <div
              v-if="transaksi.loadingPayment"
              class="flex items-center justify-center py-12"
            >
              <icon
                name="line-md:loading-twotone-loop"
                class="text-4xl text-primary"
              />
            </div>
            <!-- END GET PAYMENT -->

            <div
              class="mt-2 py-2 border-t"
              v-if="transaksi.data.data.panduan_bayar"
            >
              <h1 class="font-bold text-sm">Cara Bayar</h1>
              <div v-html="transaksi.data.data.panduan_bayar"></div>
            </div>
            <!-- <button @click.prevent="open">tes</button> -->
            <!--  -->

            <div
              v-if="
                transaksi.data.data.status !== 'Success' &&
                transaksi.data.data.status !== 'Completed'
              "
            >
              <!-- BUTTON UNTUK OVO PUSH -->
              <div
                v-if="transaksi.data.data.kode_channel === 'OVOPUSH' && !resOvo"
                class="px-4 absolute bottom-3 left-0 w-full"
              >
                <button class="btn-primary w-full" @click.prevent="open()">
                  Bayar Sekarang
                </button>
              </div>
              <!-- END BUTTON UNTUK OVO PUSH -->

              <!-- BUTTON UNTUK PAYMENT LINK -->
              <div
                v-if="
                  !transaksi.loadingPayment && transaksi.payment.checkout_url
                "
                class="px-4 absolute bottom-3 left-0 w-full"
              >
                <a
                  class="btn-primary w-full flex text-center justify-center"
                  target="new_tab"
                  :href="transaksi.payment.checkout_url"
                >
                  Bayar Sekarang
                </a>
              </div>
              <!-- END BUTTON UNTUK PAYMENT LINK -->
            </div>
          </div>

          <!-- RES OVO -->
          <div
            v-if="
              resOvo &&
              transaksi.data.data.status !== 'Success' &&
              transaksi.data.data.status !== 'Completed'
            "
            class="w-full py-20"
          >
            <div class="text-center">
              <icon
                name="line-md:loading-twotone-loop"
                class="text-5xl text-green-600 mx-auto"
              />
            </div>
            <p class="text-center text-sm text-green-600">
              Memeriksa Pembayaran...
            </p>
            <div class="text-center text-sm text-gray-600 mt-1">
              {{ resOvo }}
            </div>
          </div>

          <!-- END RES OVO -->

          <!-- PAYMENT SUKSES -->
          <div
            v-if="
              transaksi.data.data.status === 'Success' ||
              transaksi.data.data.status === 'Completed'
            "
            class="w-full py-20"
          >
            <div class="text-center">
              <icon
                name="solar:check-circle-bold"
                class="text-5xl text-green-600 mx-auto"
              />
            </div>

            <p class="text-center text-sm text-green-600">Pembayaran Sukses</p>

            <div class="text-center text-sm text-gray-600 mt-1">
              Redirect dalam {{ timer }} detik
            </div>
          </div>
          <!-- END PAYMENT SUKSES -->
        </div>
      </div>
      <div
        v-if="transaksi.loading"
        class="flex items-center justify-center h-full"
      >
        <loader />
      </div>

      <div
        v-if="!transaksi.loading && transaksi.error"
        class="flex items-center justify-center h-full"
      >
        <div>
          <p class="text-center">
            <icon
              class="text-gray-500 text-[72px]"
              name="solar:sad-square-bold-duotone"
            />
          </p>
          <p class="text-gray-500 text-sm mt-4">
            {{ transaksi.error }}
          </p>
        </div>
      </div>
    </div>

    <!-- FOOTER -->
    <div class="flex justify-center mt-4">
      <div class="text-white text-center w-full pb-4">
        <p class="text-xs">Powered by</p>
        <img class="h-5 mx-auto mt-1" src="/tokopay-w.png" alt="" />
      </div>
    </div>
    <!-- END FOOTER -->
    <ClientOnly>
      <vue-bottom-sheet ref="ovoPush" max-width="480px">
        <form class="p-4" @submit.prevent="pushOvo()">
          <img
            src="https://js.durianpay.id/assets/img_ovo.svg"
            class="h-12 mx-auto mb-4"
            alt=""
          />
          <span class="text-gray-500 text-sm">Nomor Handphone</span>
          <div class="relative flex">
            <input
              type="text"
              inputmode="numeric"
              v-model="phone"
              maxlength="14"
              :class="isPhoneError ? 'focus:border-red-500' : ''"
              class="p-2 font-bold text-lg border rounded-md focus:outline-none focus:border-primary w-full block"
            />
          </div>
          <span class="text-xs block text-gray-500 mt-2"
            >Contoh: 085151441226</span
          >
          <button
            type="submit"
            :disabled="push.loading"
            class="btn-primary w-full mt-4"
          >
            <icon
              v-if="push.loading"
              name="line-md:loading-twotone-loop"
              class="text-xl"
            />
            <span v-if="!push.loading"> Bayar Dengan OVO</span>
          </button>
        </form>
      </vue-bottom-sheet>
    </ClientOnly>
  </div>
</template>

<script setup>
// getData
import { useTransaksi } from '@/store/transaksi';
import { usePush } from '@/store/push';

const transaksi = useTransaksi();
const push = usePush();
const { $toast } = useNuxtApp();
const ovoPush = ref(null);
const showDetail = ref(false);
const timer = ref(0);
const route = useRoute();
const phone = ref('');
const isPhoneError = ref(false);
const resOvo = ref('');
const statusOvo = ref(true);
const open = () => {
  ovoPush.value.open();
};

const close = () => {
  ovoPush.value.close();
};
watch(phone, val => {
  val.startsWith('08')
    ? (isPhoneError.value = false)
    : (isPhoneError.value = true);
});

// CEK STATUS OVO PER 5 MENIT
watch(statusOvo, val => {
  if (statusOvo.value) {
    setInterval(() => {
      getData(false);
    }, 2000);
  }
});

const pushOvo = async () => {
  try {
    if (isPhoneError.value) {
      $toast.error('Nomor Handphone tidak valid');
    } else {
      resOvo.value = '';
      statusOvo.value = false;
      const res = await push.actionPushOvo(route.params.id, phone.value);
      if (res.data.status) {
        resOvo.value = res.data.message;
        statusOvo.value = true;
        close();
      } else {
        $toast.error(res.data.error_msg);
      }
    }
  } catch (error) {
    $toast.error(error);
  }
};

const copyText = v => {
  navigator.clipboard.writeText(v);
  $toast.success('Copy:' + v);
};

setInterval(() => {
  timer.value--;
}, 1000);

useHead({
  title: `#${route.params.id} - Tokopay`
});

const getData = firstLoad => {
  transaksi.getData(route.params.id, firstLoad).then(res => {
    if (res.status) {
      const d = res.data.data;
      if (d.status === 'Success' || d.status === 'Completed') {
        timer.value = 10;
        setTimeout(() => {
          window.location = d.redirect_url
            ? d.redirect_url
            : '/' + route.params.id;
        }, 10000);
      }
    } else {
      window.document.title = 'Data Not Found - Tokopay';
    }
  });
};
getData(true);
transaksi.getPayment(route.params.id);
</script>
