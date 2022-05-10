<template>
  <div
    class="flex flex-column justify-between items-center tc vh-100 about-wrapper"
  >
    <header class="w-100 flex justify-end ph3 pt3">
      <ButtonExitGame />
    </header>
    <section class="measure">
      <h1>
        <NuxtLink to="/">{{ title }}</NuxtLink>
      </h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo nobis
        corporis iste omnis quaerat aut, aperiam hic! Ipsum, dolorum. Aliquid
        sit excepturi accusamus pariatur similique. Eveniet ab molestias
        repellat officiis.
      </p>
      <h2>Research</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur, adipisicing elit. Iste
        doloribus facilis voluptatem nihil quas excepturi magni provident
        accusantium, neque magnam quisquam dolor nostrum. Aut ex, repellendus
        omnis voluptatum atque, nihil!
      </p>
      <h2>Authors</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur, adipisicing elit. Iste
        doloribus facilis voluptatem nihil quas excepturi magni provident
        accusantium, neque magnam quisquam dolor nostrum. Aut ex, repellendus
        omnis voluptatum atque, nihil!
      </p>
    </section>
    <TheFooter> </TheFooter>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Tolerant Futures',
    }
  },
}
</script>

<style scoped lang="scss">
.about-wrapper {
  background-image: url('@/static/image/chapter_intro_background.jpg');
  background-size: cover;

  h1 {
    text-decoration: underline;
    padding-bottom: $offset-3;
  }

  h2 {
    padding-bottom: $offset-2;
  }

  p {
    padding-bottom: $offset-3;
  }

  h1,
  h2,
  p {
    color: $white-color;
    filter: $caption-shadow-effect;
  }
}
</style>
