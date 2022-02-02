<template>
  <div class="footer">
    <footer>
      Created by <span class="dev1">Azod#9999 (vzfjg.wam)</span> &&
      <span class="dev2">HME#1240 (43xts.wam)</span>
      <a href="https://discord.gg/"
        ><img src="../assets/QTTlogo.png" alt="" class="img"
      /></a>
    </footer>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>

<style scoped>
footer {
  position: fixed;
  bottom: 0;
}
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1em;
}
.img {
  margin: 0 15px 10px 50px;
}
.dev1 {
  color: #d666e0;
}
.dev2 {
  color: #e74c3c;
}
</style>