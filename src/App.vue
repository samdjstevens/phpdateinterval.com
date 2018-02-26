<template>
  <div class="container">

    <h1>
      <code>new \DateInterval('<span class="highlighted">{{ formatString }}</span>')</code>
    </h1>

    <span class="inEnglish" v-if="definition">{{ definitionInEnglish }}</span>
    <span class="inEnglish invalid" v-if="! definition">could not understand the input :(</span>

    <input class="text-input" type="text" v-model="periodInEnglish" ref="input">

    <div class="buttons">
      <button v-on:click="setPeriodInEnglish('one year')">one year</button>
      <button v-on:click="setPeriodInEnglish('one month')">one month</button>
      <button v-on:click="setPeriodInEnglish('2 weeks')">two weeks</button>
      <button v-on:click="setPeriodInEnglish('one day')">1 day</button>
      <button v-on:click="setPeriodInEnglish('one hour')">1 hour</button>
      <button v-on:click="setPeriodInEnglish('five minutes')">5 minutes</button>
    </div>

    <hr>

    <h3 id="whatisthis">What is this?</h3>

    <p>
      this website generates the
      <a href="https://en.wikipedia.org/wiki/ISO_8601#Time_intervals" target="_blank">ISO 8601 spec</a> string
      needed in the PHP
      <a href="http://php.net/manual/en/class.dateinterval.php" target="_blank"><code>DateInterval</code></a>
      constructor, for a given period of time.
    </p>

  </div>
</template>

<style>

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
}

code {
  word-wrap: break-word;
}

.container {
  width: 90%;
  margin: 40px auto;
  text-align: center;
}

@media screen and (min-width: 800px) {
  .container {
    margin-top: 80px;
  }
}

h1 {
  font-size: 20px;
}
@media screen and (min-width: 600px) {
  h1 {
    font-size: 30px;
  }
}
@media screen and (min-width: 800px) {
  h1 {
    font-size: 40px;
  }
}

.highlighted {
  background: rgba(255, 255, 11);
  background-color: rgba(255, 255, 11, 0.8);
}

.buttons {
  margin-bottom: 50px;
}

.buttons > button {
  font-size: 125%;
  padding: 5px 10px;
  margin: 5px;
}

.text-input {
  margin:40px 0;
  width: 100%;
  font-size: 150%;
  padding: 10px;
  text-align: center;
}

hr {
  border: none;
  height: 1px;
  background:#eee;
  max-width: 300px;
  margin-bottom: 50px;
}

.inEnglish {
  font-size: 24px;
  font-style: italic;
  color: #555;
}
.invalid {
  color: rgb(255, 53, 91)
}

</style>

<script>
import format from './util/format_generator'
import english_to_definition from './util/english_to_definition'
import definition_to_english from './util/definition_to_english'
export default {
  name: 'app',

  data () {
    return {
      periodInEnglish: 'one year, 2 months, 3 days',
    }
  },

  computed: {
    /**
     * The ISO 8601 format for the definition.
     */
    formatString () {
      if (!this.definition) {
        return ''
      }

      return format(this.definition)
    },

    /**
     * The current definition outputted as english text.
     */
    definitionInEnglish () {
      if (!this.definition) {
        return 'could not parse input string. is it valid?'
      }

      return definition_to_english(this.definition)
    },

    /**
     * A definition object representing the current input's value.
     * False if invalid english text.
     */
    definition () {
      return english_to_definition(this.periodInEnglish)
    }
  },

  methods: {
    /**
     * Set the text input value to something.
     */
    setPeriodInEnglish (periodInEnglish) {
      this.periodInEnglish = periodInEnglish
    }
  },

  /**
   * Focus on the text input as soon as we can.
   */
  mounted () {
    setTimeout(_ => this.$refs.input.focus(), 500)
  }
}
</script>
