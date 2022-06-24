<template>
  <div class="card-container">
    <img :src="image" alt="Building image" />
    <div class="infos-section">
      <span class="text-center"
        ><b>{{ `${address}, ${number}` }}</b></span
      >
      <span class="text-center">{{ city }}</span>
      <span class="text-center"
        ><b>{{ asking_price | formatcurrecy }}</b></span
      >
      <span class="text-center">{{
        `${bedrooms}QT ${suites}ST ${parking_spots}VG`
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: "",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    suites: {
      type: Number,
      required: true,
    },
    parking_spots: {
      type: Number,
      required: true,
    },
    asking_price: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.card-container {
  width: 13.5rem;
  background: #d9d9d9;
}
.infos-section {
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.8rem;
}
.text-center {
  text-align: center;
}
img {
  width: 13.5rem;
  height: 7.875rem;
}
@media only screen and (max-width: 800px) {
  .card-container {
    width: 70%;
    background: #d9d9d9;
  }
  img {
    width: 100%;
    height: 14rem;
}
}
</style>