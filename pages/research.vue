<template>
  <div class="flex flex-column justify-between items-center tc vh-100">
    <h1>{{ title }}</h1>
    <section class="measure">
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo nobis
        corporis iste omnis quaerat aut, aperiam hic! Ipsum, dolorum. Aliquid
        sit excepturi accusamus pariatur similique. Eveniet ab molestias
        repellat officiis.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur, adipisicing elit. Iste
        doloribus facilis voluptatem nihil quas excepturi magni provident
        accusantium, neque magnam quisquam dolor nostrum. Aut ex, repellendus
        omnis voluptatum atque, nihil!
      </p>
    </section>
    <TheFooter>
      <NuxtLink to="/">Back to start</NuxtLink>
    </TheFooter>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Tolerant Futures - the research',
    }
  },
}
</script>
