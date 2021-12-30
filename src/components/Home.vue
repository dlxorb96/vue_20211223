<template>
  <div>
    <h3>home</h3>
    <!-- <vueper-slides :autoplay ="true" :duration=4000>
      <vueper-slide
        v-for="(tmp, idx) in items"
        :key="idx"
        :title="tmp.title"
        :content="tmp.content"
        :image ="tmp.image"
        
      />
    


      <vueper-slides
      class="no-shadow"
      :visible-slides="3"
      slide-multiple
      :gap="3"
      :slide-ratio="1 / 4"
      :dragging-distance="200"
      :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }"
      :autoplay ="true" 
      :duration = 3000 
    >
        <vueper-slide v-for="tmp in items" :key="tmp" 
        :title="tmp.title"
        :image ="tmp.image"

    </vueper-slides> /> -->
    <vueper-slides
      class="no-shadow"
      :visible-slides="4"
      :arrows="false"
      :slide-ratio="1 / 4"
      :gap="4"
      :dragging-distance="70"
      :autoplay= "true"
      :duration= 3000
    >
      <vueper-slide 
      v-for="tmp in items" 
      :key="tmp" 
      :title="tmp.title"
      :image="tmp.image" />
    </vueper-slides>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
export default {
  components: { VueperSlides, VueperSlide },
  data() {
    return {
      items: [
        {
          title: "a",
          content: "b",
          image: "https://picsum.photos/500/300?image=11",
        },
        {
          title: "a",
          content: "b",
          image: "https://picsum.photos/500/300?image=30",
        },
        {
          title: "a",
          content: "b",
          image: "https://picsum.photos/500/300?image=80",
        },
        {
          title: "a",
          content: "b",
          image: "https://picsum.photos/500/300?image=450",
        },
        {
          title: "a",
          content: "b",
          image: "https://picsum.photos/500/300?image=50",
        },
        {
          title: "a",
          content: "b",
          image: "https://picsum.photos/500/300?image=14",
        },
        {
          title: "a",
          content: "b",
          image: "https://picsum.photos/500/300?image=37",
        },
        {
          title: "a",
          content: "b",
          image: "https://picsum.photos/500/300?image=99",
        },
        {
          title: "a",
          content: "b",
          image: "https://picsum.photos/500/300?image=136",
        },
        {
          title: "a",
          content: "b",
          image: "https://picsum.photos/500/300?image=210",
        },
        {
          title: "a",
          content: "b",
          image: "https://picsum.photos/500/300?image=34",
        },
        {
          title: "a",
          content: "b",
          image: "https://picsum.photos/500/300?image=71",
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>