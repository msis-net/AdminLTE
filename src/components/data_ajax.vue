<template>
    <div>
      <nav>
        <button role="button" @click="openMenu()">
          Read Server CSV
        </button>
        

      </nav>
    </div>
  </template>
  
  <script setup lang="ts">

  const openMenu = () => {
      let xhr = new XMLHttpRequest()
      xhr.open('GET', 'utf_all.csv', true)
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('xhr.status',xhr.responseText )
          } else {
            console.log('Error!')
          }
        } else {
          console.log('Connecting...')
        }
      }
        xhr.send(null)
  }
  </script>