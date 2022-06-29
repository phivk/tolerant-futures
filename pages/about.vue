<template>
  <div
    class="relative flex flex-column justify-center items-center tc about-wrapper"
  >
    <header class="w-100 flex justify-end ph3 pt3">
      <NuxtLink to="/">
        <ButtonExitGame />
      </NuxtLink>
    </header>
    <section class="mw7 tl mv5">
      <h1>
        <NuxtLink class="underline" to="/">{{ title }}</NuxtLink>
      </h1>

      <p>
        This digital experience has been designed as part of the Co-producing
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
        these uses through this digital experience and by developing education
        training resources to promote more nuanced and less binary
        interpretation of the Iron Age and Roman past at heritage venues and in
        primary school classrooms.
      </p>

      <h2>Team</h2>
      <h3>Core research</h3>
      <StandaloneConditionalDisplay>
        <template #standalone>
          <ul class="lh-copy">
            <li>
              Dr Chiara Bonacchi, Principal Investigator, University of
              Edinburgh
            </li>
            <li>
              Professor Richard Hingley, Co-Investigator, Durham University
            </li>
            <li>Dr Kate Sharpe, Post-Doctoral Researcher, Durham University</li>
          </ul>
        </template>
        <template #browser>
          <ul class="lh-copy">
            <li>
              <a
                href="https://www.ed.ac.uk/history-classics-archaeology/history/about/staff-profiles/chiara-bonacchi"
                target="_blank"
                >Dr Chiara Bonacchi</a
              >, Principal Investigator, University of Edinburgh
            </li>
            <li>
              <a
                href="https://www.durham.ac.uk/staff/richard-hingley/"
                target="_blank"
                >Professor Richard Hingley</a
              >, Co-Investigator, Durham University
            </li>
            <li>
              <a
                href="https://www.durham.ac.uk/staff/kate-sharpe/"
                target="_blank"
                >Dr Kate Sharpe</a
              >, Post-Doctoral Researcher, Durham University
            </li>
          </ul>
        </template>
      </StandaloneConditionalDisplay>

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
        <li>Dr Elisa Broccoli - Museum Signage Graphic Design</li>
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

      <h2>Advisory Panel</h2>
      <ul class="lh-copy">
        <li>Dr Gary Husband (University of Stirling)</li>
        <li>Dr Gregory Mannion (University of Stirling)</li>
        <li>Dr Hana Morel (University College London)</li>
        <li>Prof. Harold Mytum (University of Liverpool)</li>
        <li>Dr Jo Smith (University of Stirling)</li>
        <li>Dr Matt Symonds (Current Archaeology)</li>
        <li>Dr Tom Yarrow (Durham University).</li>
      </ul>

      <h2>Contact us</h2>
      <p>
        For further information about this digital experience please contact:

        <StandaloneConditionalDisplay>
          <template #standalone>
            <ul class="lh-copy">
              <li class="mv2">
                Chiara Bonacchi,
                <span class="i"
                  >Principal Investigator, University of Edinburgh</span
                >:
                &#99;&#104;&#105;&#97;&#114;&#97;&#46;&#98;&#111;&#110;&#97;&#99;&#99;&#104;&#105;&#64;&#101;&#100;&#46;&#97;&#99;&#46;&#117;&#107;
              </li>
              <li class="mv2">
                Richard Hingley,
                <span class="i">Co-Investigator, Durham University</span>:
                &#114;&#105;&#99;&#104;&#97;&#114;&#100;&#46;&#104;&#105;&#110;&#103;&#108;&#101;&#121;&#64;&#100;&#117;&#114;&#104;&#97;&#109;&#46;&#97;&#99;&#46;&#117;&#107;
              </li>
              <li class="mv2">
                Kate Sharpe,
                <span class="i"
                  >Post-Doctoral Researcher, Durham University</span
                >:
                &#107;&#97;&#116;&#101;&#46;&#115;&#104;&#97;&#114;&#112;&#101;&#64;&#100;&#117;&#114;&#104;&#97;&#109;&#46;&#97;&#99;&#46;&#117;&#107;
              </li>
            </ul>
          </template>
          <template #browser>
            <ul class="lh-copy">
              <li class="mv2">
                Chiara Bonacchi,
                <span class="i"
                  >Principal Investigator, University of Edinburgh</span
                >:
                <a
                  href="mailto:&#99;&#104;&#105;&#97;&#114;&#97;&#46;&#98;&#111;&#110;&#97;&#99;&#99;&#104;&#105;&#64;&#101;&#100;&#46;&#97;&#99;&#46;&#117;&#107;"
                  target="_blank"
                  >&#99;&#104;&#105;&#97;&#114;&#97;&#46;&#98;&#111;&#110;&#97;&#99;&#99;&#104;&#105;&#64;&#101;&#100;&#46;&#97;&#99;&#46;&#117;&#107;</a
                >
              </li>
              <li class="mv2">
                Richard Hingley,
                <span class="i">Co-Investigator, Durham University</span>:
                <a
                  href="&#114;&#105;&#99;&#104;&#97;&#114;&#100;&#46;&#104;&#105;&#110;&#103;&#108;&#101;&#121;&#64;&#100;&#117;&#114;&#104;&#97;&#109;&#46;&#97;&#99;&#46;&#117;&#107;"
                  target="_blank"
                  >&#114;&#105;&#99;&#104;&#97;&#114;&#100;&#46;&#104;&#105;&#110;&#103;&#108;&#101;&#121;&#64;&#100;&#117;&#114;&#104;&#97;&#109;&#46;&#97;&#99;&#46;&#117;&#107;</a
                >
              </li>
              <li class="mv2">
                Kate Sharpe,
                <span class="i"
                  >Post-Doctoral Researcher, Durham University</span
                >:
                <a
                  href="&#107;&#97;&#116;&#101;&#46;&#115;&#104;&#97;&#114;&#112;&#101;&#64;&#100;&#117;&#114;&#104;&#97;&#109;&#46;&#97;&#99;&#46;&#117;&#107;"
                  target="_blank"
                  >&#107;&#97;&#116;&#101;&#46;&#115;&#104;&#97;&#114;&#112;&#101;&#64;&#100;&#117;&#114;&#104;&#97;&#109;&#46;&#97;&#99;&#46;&#117;&#107;</a
                >
              </li>
            </ul>
          </template>
        </StandaloneConditionalDisplay>
      </p>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'scrollable',
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
