<template>
  <div class="flex flex-column justify-between items-center tc vh-100">
    <header>
      <ButtonExitGame/>
    </header>
    <section class="measure">
      <h1><NuxtLink to="/">{{ title }}</NuxtLink></h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo nobis
        corporis iste omnis quaerat aut, aperiam hic! Ipsum, dolorum. Aliquid
        sit excepturi accusamus pariatur similique. Eveniet ab molestias
        repellat officiis.
      </p>
      <h2> Research </h2>
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
      title: 'Emapthy Spectrum',

    }
  },
}
</script>

<style scoped lang="scss">
  
  header {
    width: 100%;

    a {
      padding-top: 200px;
    }
    height: 150px;
  }

  h1,h2,p {
    color: $white-color;
   }
</style>