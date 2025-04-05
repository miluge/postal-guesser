// src/views/HomeView.vue
<template>
  <div class="home">
    <h1>Postal Code Sorter Game</h1>
    <p>Test your knowledge of postal codes and their conveyor belt positions!</p>
    
    <div class="actions">
      <router-link to="/game" class="button primary">Start Game</router-link>
      <router-link to="/manage" class="button secondary">Manage Data</router-link>
    </div>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
}

.actions {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.button {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.2s;
}

.primary {
  background-color: #4F46E5;
  color: white;
}

.primary:hover {
  background-color: #4338ca;
}

.secondary {
  background-color: #f3f4f6;
  color: #4b5563;
}

.secondary:hover {
  background-color: #e5e7eb;
}
</style>