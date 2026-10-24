#!/bin/bash

echo "=========================================="
echo "  🌿 SLoW - Automatyczny Deploy do Git"
echo "=========================================="

# 1. Pokaż co zostało zmienione
git status

# 2. Zapytaj użytkownika o tytuł commita
echo ""
read -p "💬 Podaj tytuł commita (np. feat(ui): opis zmian): " commit_msg

# Sprawdź czy użytkownik wpisał cokolwiek
if [ -z "$commit_msg" ]; then
  echo "❌ Anulowano: Tytuł commita nie może być pusty!"
  exit 1
fi

echo ""
echo "📦 Krok 1/3: Dodawanie plików (git add)..."
git add .

echo "💬 Krok 2/3: Tworzenie commita..."
git commit -m "$commit_msg"

echo "🚀 Krok 3/3: Wypychanie na remote (git push origin development)..."
git push origin development

echo ""
echo "✨ Gotowe! Zmiany zostały pomyślnie wysłane na GitHub. 🌿"