<template>
  <div id="nav">
    <router-link to="/">
      <img src="/assets/svg/freepik/svg/008-home (2).svg" />
    </router-link>
    <router-link to="/settings">
      <img src="/assets/svg/freepik/svg/002-settings (2).svg" />
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style>
#nav {
  user-select: none;
  padding: 5px;
  display: flex;
  flex-direction: column;
  width: var(--nav-width);
  margin: 5px 0px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  justify-content: space-between;
  background-color: var(--dark-background-color);
}
#nav > a {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--main-text-color);
  width: var(--nav-width);
  height: var(--nav-width);
  border-radius: 15px;
  -webkit-user-drag: none;
  transition: background-color ease-in-out 100ms;
}
#nav > a:hover {
  background-color: var(--nav-hover-color);
}
#nav > a.router-link-exact-active {
  background-color: var(--nav-active-color);
}

#nav > a > img {
  width: 50%;
  transition: width ease-in-out 100ms;
  filter: grayscale(50%);
}
#nav > a:hover > img {
  width: 60%;
  filter: grayscale(0%);
}
#nav > a.router-link-exact-active > img {
  width: 60%;
  filter: grayscale(0%);
}
</style>