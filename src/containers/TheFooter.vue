<template>
  <CFooter :fixed="false">
    <div>
      <a
        href="https://alphamm.net"
        target="_blank"
      >Alpha.inc</a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}} YGR Network.</span>
    </div>
    <div class="ml-auto">
      <span class="mr-1">Powered by</span>
      <a
        href="https://alphamm.net"
        target="_blank"
      >Alpha</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
