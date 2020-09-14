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
  display: flex;
  flex-direction: column;
  width: calc (var(--nav-width) + 10px );
  padding: 5px;
  border-radius: 15px 15px 0 0;
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
  -webkit-user-drag: none;
  filter: grayscale(80%);
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