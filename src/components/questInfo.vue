<template>
  <div>
    <h1 v-if="questStatus === 'NO_DATA' " class="noData">No Data</h1>
    <div v-if="questStatus !== 'NO_DATA' ">
      <b-table striped hover :items="items"></b-table>
      <h3 class="pathwayHeader">Pathways</h3>
      <div class="pathwayContainer" >
        <div class="pathwayInfo">
          <div class="pathwayStatus pathwayItem">
            <p>Status</p>
            <p v-for="inf in questInfo[0]">{{inf.status}}</p>
          </div>
          <div class="pathwayName pathwayItem">
            <p>Pathway Name</p>
            <p v-for="inf in questInfo[0]">{{inf.name}}</p>
          </div>
          <div class="leafsInfo">
            <ul class="leafsInfoList">
              <li v-for="leaf in questLeafsProgress" class="leaf">
                <i class="fas fa-check icon" v-if="leaf.status === 'success' " style="color: green"></i>
                <i class="fas fa-times icon" v-else-if="leaf.status === 'failed' " style="color: red"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeafProgressStep from '../models/leafProgress.model'
    export default {
        name: "questInfo",
        data() {
          return {
            questStatus: '',
            questInfo: [],
            questLeafsProgress: [],
            items: [
              { 'Build Id': this.questInfo[0].globalId.toString(),
                'Platform': this.questInfo[0].platform,
                'Quest Name': this.questInfo[0].name }
            ]
          }
        },
        methods: {
          generateLeafProgressArray(success = [], failed = []) {
            success.forEach(successLeaf => {
              this.questLeafsProgress.push(
                new LeafProgressStep(successLeaf.name, 'success')
              );
            });
            failed.forEach(failedLeaf => {
              this.questLeafsProgress.push(
                new LeafProgressStep(failedLeaf.name, 'failed')
              );
            });
          },
          getCurrentQuestProgress(questLeafs, finishedLeafs, id) {
            const solvedLeafs = finishedLeafs.filter(l => {
              return l['questId'] === id;
            });
            if (questLeafs.length === solvedLeafs.length) {
                this.generateLeafProgressArray(questLeafs);
            } else {
                const failedLeafsCount = questLeafs.length - solvedLeafs.length;
                const failed = questLeafs.slice(-failedLeafsCount);
                this.generateLeafProgressArray(solvedLeafs, failed);
            }
          },
          getLeafs() {
            this.$http.get('http://localhost:3000/finishedQuests')
              .then(function (res) {
                this.getCurrentQuestProgress(
                  this.questInfo[0].pathway.leafs,
                  res.data,
                  this.questInfo[0].id
                );
              });
          }
        },
        beforeCreate() {
          this.questInfo = this.$route.params['info'];
          this.questStatus = this.$route.params['status'];
        },
        created: function() {
          this.questInfo = this.$route.params['info'];
          this.getLeafs();
        },
        destroyed() {
          this.questInfo = [];
          this.leafs = [];
        }
    }
</script>

<style scoped>

  .noData {
    text-align: center;
  }
  .pathwayContainer{
    width: 100%;
    display: flex;
    margin-top: 5%;
  }
  .pathwayHeader {
    margin-top: 5%;
    width: 100%;
    text-align: center;
  }
  .pathwayInfo {
    display: flex;
    flex-flow: row nowrap;
    width: 100%
  }
  .pathwayItem {
  }
  .pathwayStatus, .pathwayName  {
    display: flex;
    flex-flow: column nowrap;
    width: 15%;
  }

  .leafsInfo {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
  }

  .leafsInfoList {
    display: flex;
    flex-flow: row wrap;
  }

  .fas {
    padding: 0 2em;
  }

  .leafsInfoList .leaf {
    list-style: none;
  }

</style>

<!--v-for="inf in questInfo[0]">-->
<!--<h3>{{inf.status}}</h3>-->
