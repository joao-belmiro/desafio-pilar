<template>
  <div class="container">
    <div class="filter-container">
      <div class="text-field">
        <input
          @change="filterByAddressOrCity"
          v-model="addressOrCity"
          class="filter-input"
          type="text"
          placeholder="Digite o endereço ou a cidade"
        />
        <img class="search-icon" src="@/assets/icons/search-icon.svg" />
      </div>
      <select v-model="priceFilter" class="filter-select">
        <option disabled hidden selected value></option>
        <template v-for="sOptions in priceOptions">
          <option
            class="option-decorator"
            :key="sOptions.label"
            :value="sOptions"
          >
            {{ sOptions.label }}
          </option>
        </template>
      </select>
      <select
        v-model="statusFilter"
        class="filter-select"
        name="Situação "
        id=""
      >
        <option disabled hidden selected value></option>
        <template v-for="sOptions in statusOptions">
          <option
            class="option-decorator"
            :key="sOptions.label"
            :value="sOptions"
          >
            {{ sOptions.label }}
          </option>
        </template>
      </select>
    </div>
    <div class="cards-container">
      <Card
        v-for="data in dataSet"
        :key="data.id"
        :id="data.id"
        :image="data.image"
        :address="data.address"
        :number="data.number"
        :city="data.city"
        :bedrooms="data.bedrooms"
        :suites="data.suites"
        :parking_spots="data.parking_spots"
        :asking_price="data.asking_price"
      />
    </div>
  </div>
</template>

<script>
import seed from "../utils/seed.json";
import Card from "./Card";

const ordenationDesc = function (property) {
  return (p1, p2) =>
    p1[property] > p2[property] ? -1 : p1[property] < p2[property] ? 1 : 0;
};

const ordenationAsc = function (property) {
  return (p1, p2) =>
    p1[property] > p2[property] ? 1 : p1[property] < p2[property] ? -1 : 0;
};

export default {
  name: "Home",
  components: {
    Card,
  },
  data() {
    return {
      dataSet: seed,
      addressOrCity: "",
      priceFilter: null,
      statusFilter: null,
      priceOptions: [
        {
          label: "Mais Caro",
          value: ordenationDesc("asking_price"),
        },
        {
          label: "Mais Barato",
          value: ordenationAsc("asking_price"),
        },
      ],
      statusOptions: [
        {
          label: "Ativos",
          value: (product) => product.active,
        },
        {
          label: "Inativos",
          value: (product) => !product.active,
        },
        {
          label: "Todos",
          value: () => {
            return true;
          },
        },
      ],
    };
  },
  watch: {
    statusFilter(current) {
      if (current) this.filterBy(current.value);
    },
    priceFilter(current) {
      if (current) this.sortBy(current.value);
    },
  },
  methods: {
    sortBy(sortFunction) {
      this.dataSet = seed.sort(sortFunction);
    },
    filterBy(functionPayload) {
      this.dataSet = seed.filter(functionPayload);
      console.log(this.dataSet);
    },
    filterByAddressOrCity() {
      let filterPayload = (p) =>
        p.address.toLowerCase().indexOf(this.addressOrCity) !== -1 ||
        p.city.toLowerCase().indexOf(this.addressOrCity) !== -1;
      this.filterBy(filterPayload);
    },
  },
};
</script>

<style scoped>
.option-decorator {
  font-size: 1rem;
  margin: 0.5rem;
  text-align: center;
}
input {
  margin: 0;
  padding: 0;
}
.filter-select {
  border: none;
  width: 13.5rem;
  height: 3rem;
  background: #d9d9d9;
  border-radius: 0.375rem;
  font-size: 1rem;
}
.text-field {
  width: 32rem;
  height: 2.6rem;
}
.filter-input {
  border: none;
  width: 100%;
  height: 3rem;
  background: #d9d9d9;
}
.text-field .search-icon {
  right: -29.375rem;
  top: -2.263rem;
  position: relative;
}
.container {
  margin: 2.5rem 7.5rem 0 7.5rem;
}
.filter-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 5rem;
  margin-bottom: 1.25rem;
}
.cards-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 1.25rem;
  column-gap: 5rem;
}
@media only screen and (max-width: 800px) {
  .container {
    margin: 2.5rem 0 2.5rem 0;
  }
  .cards-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1.25rem;
    column-gap: 0rem;
  }
  .filter-container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    row-gap: 1.25rem;
    column-gap: 0;
    margin-bottom: 1.25rem;
  }
  .text-field {
    width: 70%;
  }
  .filter-select {
    width: 70%;
  }
  .search-icon[data-v-8dc7cce2] {
    right: -20.375rem;
    top: -2.263rem;
    position: relative;
  }
}
</style>
