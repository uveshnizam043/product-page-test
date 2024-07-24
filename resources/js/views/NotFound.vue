<template>
  <div class="not-found">
    <div class="not-found__container">
      <img alt="product" src="../../../public/images/empty-state.png" class="not-found__image" />
      <div class="not-found__text">
        <span class="not-found__404">404</span>
        <div class="not-found__text-1">
          What you are looking for doesn't exist
        </div>
        <div class="not-found__text-2">
          We recommend you head on over to
          <router-link class="not-found__link" to="/">Product</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style>
.not-found {
  max-width: 900px;
  margin: auto;
  padding: 0 4px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.not-found__container {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 950px;
}

.not-found__image {
  width: 400px;
}

.not-found__text {
  font-size: 1.5rem; 
  font-weight: 300;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.not-found__404 {
  font-weight: 500;
  font-size: 4rem;
  color: rgb(202, 202, 202);
}

.not-found__text-1,
.not-found__text-2 {
  margin-bottom: 16px;
}

.not-found__link {
  text-decoration: underline;
}
</style>
