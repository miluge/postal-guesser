<template>
    <div class="game-container">
      <div class="stats">
        <div class="score">Success Rate: {{ successRate }}%</div>
        <div class="attempts">Attempts: {{ totalAttempts }}</div>
      </div>
  
      <div class="postal-code" v-if="currentPostalCode">
        <h2>{{ currentPostalCode.code }}</h2>
      </div>
  
      <div class="controls">
        <h3>Position sur le convoyeur ?</h3>
        
        <!-- Desktop controls (keyboard arrows) -->
        <div class="keyboard-controls" :tabindex="0" @keydown="handleKeyPress" ref="keyboardControls">
          <div class="keyboard-instruction">
            Utilisez les flèches clavier: ← Gauche | → Droite | ↑ Bas
          </div>
        </div>
        
        <!-- Mobile controls (buttons) -->
        <div class="button-controls">
          <button 
            @click="checkAnswer('left')" 
            :class="{'answer-button': true, 'correct': lastAnswer === 'left' && lastAnswerCorrect, 'incorrect': lastAnswer === 'left' && !lastAnswerCorrect}">
            Left
          </button>
          <button 
            @click="checkAnswer('middle')" 
            :class="{'answer-button': true, 'correct': lastAnswer === 'middle' && lastAnswerCorrect, 'incorrect': lastAnswer === 'middle' && !lastAnswerCorrect}">
            Middle
          </button>
          <button 
            @click="checkAnswer('right')" 
            :class="{'answer-button': true, 'correct': lastAnswer === 'right' && lastAnswerCorrect, 'incorrect': lastAnswer === 'right' && !lastAnswerCorrect}">
            Right
          </button>
        </div>
      </div>
  
      <div class="result" :class="{'correct': lastAnswerCorrect === true, 'incorrect': lastAnswerCorrect === false}" v-if="lastAnswer">
        <template v-if="lastAnswerCorrect">
          Correct! This postal code goes to {{ lastAnswer }}.
        </template>
        <template v-else>
          Incorrect! This postal code goes to {{ currentPostalCode.position }}, not {{ lastAnswer }}.
        </template>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, nextTick } from 'vue';
  import postalCodeService from '../services/__mocks__/postalCodeService';
  
  // Game state
  const postalCodes = ref([]);
  const currentPostalCode = ref(null);
  const currentIndex = ref(-1);
  const correctAnswers = ref(0);
  const totalAttempts = ref(0);
  const lastAnswer = ref(null);
  const lastAnswerCorrect = ref(null);
  const keyboardControls = ref(null);
  
  // Computed properties
  const successRate = computed(() => {
    if (totalAttempts.value === 0) return 0;
    return Math.round((correctAnswers.value / totalAttempts.value) * 100);
  });
  
  // Load postal codes
  const loadPostalCodes = async () => {
    try {
      postalCodes.value = await postalCodeService.getPostalCodes();
      nextPostalCode();
    } catch (error) {
      console.error('Error loading postal codes:', error);
    }
  };
  
  // Get next random postal code
  const nextPostalCode = () => {
    if (postalCodes.value.length === 0) return;
    
    // Reset answer status
    lastAnswer.value = null;
    lastAnswerCorrect.value = null;
    
    // Get random postal code (different from current one if possible)
    let newIndex;
    if (postalCodes.value.length > 1) {
      do {
        newIndex = Math.floor(Math.random() * postalCodes.value.length);
      } while (newIndex === currentIndex.value);
    } else {
      newIndex = 0;
    }
    
    currentIndex.value = newIndex;
    currentPostalCode.value = postalCodes.value[newIndex];
    
    // Focus keyboard controls for desktop users
    nextTick(() => {
      if (keyboardControls.value) {
        keyboardControls.value.focus();
      }
    });
  };
  
  // Check answer and automatically advance
  const checkAnswer = (position) => {
    lastAnswer.value = position;
    const isCorrect = currentPostalCode.value.position === position;
    lastAnswerCorrect.value = isCorrect;
    
    totalAttempts.value++;
    if (isCorrect) {
      correctAnswers.value++;
    }
    
    nextPostalCode();
  };
  
  // Handle keyboard input
  const handleKeyPress = (event) => {
    if (event.key === 'ArrowLeft') {
      checkAnswer('left');
    } else if (event.key === 'ArrowUp') {
      checkAnswer('middle');
    } else if (event.key === 'ArrowRight') {
      checkAnswer('right');
    }
  };
  
  // Initialize game
  onMounted(() => {
    loadPostalCodes();
  });
  </script>
  
  <style scoped>
  .game-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 1rem;
  }
  
  .stats {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    font-weight: bold;
  }
  
  .postal-code {
    text-align: center;
    padding: 2rem;
    margin: 1rem 0;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .postal-code h2 {
    font-size: 3rem;
    margin: 0;
  }
  
  .controls {
    margin: 1rem 0;
    text-align: center;
  }
  
  .keyboard-controls {
    padding: 1rem;
    background-color: #eee;
    border-radius: 8px;
    margin-bottom: 1rem;
    outline: none;
  }
  
  .keyboard-controls:focus {
    box-shadow: 0 0 0 2px #4F46E5;
  }
  
  .keyboard-instruction {
    color: #666;
  }
  
  .button-controls {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
  }
  
  .answer-button {
    flex: 1;
    padding: 1rem;
    font-size: 1rem;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .answer-button:hover {
    background-color: #e0e0e0;
  }
  
  .answer-button.correct {
    background-color: #4ade80;
    color: white;
  }
  
  .answer-button.incorrect {
    background-color: #f87171;
    color: white;
  }
  
  .result {
    margin: 1rem 0;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
  }
  
  .result.correct {
    background-color: #d1fae5;
    color: #065f46;
  }
  
  .result.incorrect {
    background-color: #fee2e2;
    color: #991b1b;
  }
  
  @media (max-width: 768px) {
    .postal-code h2 {
      font-size: 2.5rem;
    }
  }
  </style>