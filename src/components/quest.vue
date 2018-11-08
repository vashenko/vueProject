<template>
  <div class="questListContainer">
    <ul class="questList">
      <li v-for="q in quests" class="questItem">
        <h4 class="qeustName">
          {{q.alias}}
        </h4>
        <div class="qeustStatus" >
          <i class="fas fa-check" v-if="q.status === 'SUCCESS' "></i>
          <i class="fas fa-times" v-else-if="q.status === 'CRASH' "></i>
          <i class="fas fa-minus" v-else></i>
          <i class="far fa-question-circle" v-on:click="navigate(q)"></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

import AdditionalInfo from '../models/additionalInfo.model'
import Quest from '../models/quest.model'

    export default {
        name: "quest",
        data() {
          return {
            additionalInfo: [],
            quests: [],
            leafs: []
          }
        },
        methods: {
          getAdditionalInfo(info, alias, globalId) {
           return info.filter(item => {
             return item.alias === alias && item.globalId === globalId;
           });
          },
          getGeneralQuests() {
            this.$http.get('http://localhost:3000/generalQuests')
              .then(function (res) {
                res.data.forEach((quest) => {
                  this.additionalInfo.push(new AdditionalInfo(
                    quest.id, quest.name, quest.alias, quest.globalId, quest.platform, quest.pathway
                  ));
                });
              });
          },
          getPageInfo() {
            this.$http.get('http://localhost:3000/pageInfo')
              .then(function (res) {
                res.data.forEach(mainInfo => {
                  this.quests.push(
                    new Quest(mainInfo.alias, mainInfo.status, this.getAdditionalInfo(this.additionalInfo, mainInfo.alias, mainInfo.globalId)));
                });
              })
          },
          navigate(event) {
            this.$router.push({name: 'questInfo', params: {info: event.additionalInfo, status: event.status}});
          },
        },
        created: function () {
          this.getGeneralQuests();
          this.getPageInfo();
        }
    }
</script>

<style scoped>
  .questListContainer {
    width: 100%;
  }
  .questList {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
  }
  .qeustName {
    border-bottom: 1px solid black;
  }
  .questItem {
    border: 1px solid black;
    margin: 0 2%;
    width: 30.6666666667%;
    list-style: none;
    text-decoration: none;
    text-align: center;
  }
  .fas {
    padding: 1em 0;
  }

  .fa-question-circle {
    margin-left: 1em;
    cursor: pointer;
  }

  .fa-check {
    color: green;
  }

  .fa-times {
    color: red;
  }
</style>

