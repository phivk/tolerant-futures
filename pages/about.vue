<template>
  <div
    class="relative flex flex-column justify-center items-center tc about-wrapper"
  >
    <header class="w-100 flex justify-end ph3 pt3">
      <ButtonExitGame />
    </header>
    <section class="mw7 tl mv5">
      <h1>
        <NuxtLink class="underline" to="/">{{ title }}</NuxtLink>
      </h1>

      <p>
        This playful experience has been designed as part of the Co-producing
        Tolerant Futures through Ancient Identities project, funded by the UK
        Arts and Humanities Research Council (AHRC). The project is led by the
        University of Edinburgh together with Durham University, with input from
        nine heritage museums and sites across Britain.
      </p>

      <p>
        Co-Producing Tolerant Futures aims to expose and challenge divisive uses
        of the Iron Age, Roman and Early Medieval past uncovered during the
        original Ancient Identities in Modern Britain project (2016-2019,
        AHRC-funded). Findings from this project showed that the Iron Age and
        Roman periods are often presented through dichotomies and exaggerated
        caricatures in formal and free-choice learning environments in Britain.
        The research also suggested that, later on in their adult life, people
        draw on these early impressions and dualistic understandings of the past
        to justify antagonism towards particular groups defined on the basis of
        ethnicity, culture and race.
      </p>

      <p>
        Co-Producing Tolerant Futures through Ancient Identities challenges
        these uses through the digital artwork you have experienced and by
        developing education training resources to promote more nuanced and less
        binary interpretation of the Iron Age and Roman past at heritage venues
        and in primary school classrooms.
      </p>

      <h2>Team</h2>
      <h3>Core research</h3>
      <ul class="lh-copy">
        <li>
          Dr Chiara Bonacchi - Principal Investigator, University of Edinburgh
        </li>
        <li>Professor Richard Hingley - Co-Investigator, Durham University</li>
        <li>Dr Kate Sharpe - Post-Doctoral Researcher, Durham University</li>
      </ul>
      <h3>Artwork</h3>
      <ul class="lh-copy">
        <li>
          Philo van Kemenade - Creative Direction, Concept, UX Design, Lead
          Developer
        </li>
        <li>
          Matúš Solčány - Concept, UX Design, Graphic Design, Front-end
          Development
        </li>
      </ul>

      <h2>Heritage Partners</h2>
      <ul class="lh-copy">
        <li>National Museum Scotland</li>
        <li>The Hunterian</li>
        <li>The Scottish Crannog Centre</li>
        <li>Great North Museum: Hancock</li>
        <li>Vindolanda & the Roman Army Museum</li>
        <li>Tullie House Museum and Art Gallery</li>
        <li>Leeds Museums and Galleries</li>
        <li>Butser Ancient Farm</li>
        <li>Castell Henllys Iron Age Village</li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Tolerant Futures',
    }
  },
  layout: 'scrollable',
}
</script>

<style scoped lang="scss">
.about-wrapper {
  background-image: url('@/static/image/chapter_intro_background.jpg');
  background-size: cover;
  color: $white-color;

  h1 {
    margin-top: $offset-4;
    margin-bottom: $offset-3;
  }

  h2 {
    margin-top: $offset-4;
    margin-bottom: $offset-3;
  }

  h3 {
    margin-top: $offset-3;
    margin-bottom: $offset-2;
  }

  p {
    margin-bottom: $offset-3;
  }

  h1,
  h2,
  h3,
  p,
  li {
    filter: $caption-shadow-effect;
  }
}
</style>
