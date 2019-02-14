<template>
<div>
    <v-sheet>
    <v-calendar
        :now="today"
        :value="today"
        color="primary"
        type="week"
        locale="de"
        :weekdays="[1,2,3,4,5]"
        :max-days="5"
        :interval-count="11"
        :first-interval="7">
        
    
    
        <template
            slot="dayBody"
            slot-scope="{ date, timeToY, minutesToPixels }"
          >
            <template v-for="event in eventsMap[date]">
             
              <div
                v-if="event.time"
                :key="event.title"
                :style="{ top: timeToY(event.time) + 'px', height: minutesToPixels(event.duration) + 'px' }"
                class="my-event with-time"
                
                v-html="event.title"
              ></div>
            </template>
          </template>
    </v-calendar>
    </v-sheet>

</div>
    
</template>
<script>
export default {
    data(){
        return{
            events: [
        {
          title: 'Kärcher',
          date: '2019-02-14',
          time: '08:00',
          duration: 480
        },
        {
          title: 'Kärcher',
          date: '2019-02-15',
          time: '09:00',
          duration: 480
        }
       
      ]
            
        }
    },
    computed:{
        today() {
            var today = new Date();
            var d = today.getDate();
            var m = today.getMonth() + 1;
            if(m<10){          
                m='0'+m
            } if(d<10){
                d= '0'+d       }           
            var y = today.getFullYear();      
            return y + "-" + m + "-" + d
      
    },
    eventsMap () {
        const map = {}
        this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
        
        return map
      }
    }
}
</script>
<style lang="stylus" scoped>
  .my-event {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    background-color: #1867c0;
    color: #ffffff;
    border: 1px solid #1867c0;
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
    margin-bottom: 1px;
    left: 4px;
    margin-right: 8px;
    position: relative;

    &.with-time {
      position: absolute;
      right: 4px;
      margin-right: 0px;
    }
  }
</style>
