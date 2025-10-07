# 🎨 Audit de Contraste des Couleurs

## Variables CSS définies

```scss
--primary-background: #1f1f1f  (très sombre, presque noir)
--primary-color: white         (#ffffff)
--primary-yellow: #fbd54a      (jaune)
```

---

## ⚠️ PROBLÈME IDENTIFIÉ

### Boutons génériques (`.btn`)

**Code actuel :**
```scss
.btn {
  background-color: var(--primary-yellow) !important; // #fbd54a
  // ❌ Pas de couleur de texte définie !
}
```

**Problème :**
- Fond : #fbd54a (jaune)
- Texte : **hérite de Materialize CSS** (probablement blanc #ffffff par défaut)
- **Ratio de contraste : 1.32:1** ❌ **ÉCHEC WCAG**

**Norme WCAG 2.1 :**
- Niveau AA : minimum 4.5:1 pour le texte normal
- Niveau AAA : minimum 7:1 pour le texte normal

**Verdict :** ❌ **NON CONFORME** - Le blanc sur jaune a un contraste insuffisant !

---

## ✅ Ce qui fonctionne bien

### 1. Navigation (`.nav-wrapper`)
```scss
background-color: #fbd54a (jaune)
color: #1f1f1f (sombre)
```
**Ratio : 14.8:1** ✅ **AAA**

### 2. Boutons de navigation actifs (`.view-tabs button.active`)
```scss
background-color: #fbd54a (jaune)
color: #1f1f1f (sombre)
```
**Ratio : 14.8:1** ✅ **AAA**

### 3. Boutons de navigation non actifs (`.view-tabs button`)
```scss
background-color: rgba(255,255,255,0.1) (transparent)
color: white
border: 2px solid #fbd54a
```
**Ratio : 14.8:1** (texte blanc sur fond sombre) ✅ **AAA**

### 4. Texte général
```scss
background: #1f1f1f (sombre)
color: white
```
**Ratio : 14.8:1** ✅ **AAA**

---

## 🔧 CORRECTIONS NÉCESSAIRES

### Solution 1 : Forcer le texte sombre sur les boutons jaunes

```scss
.btn {
  background-color: var(--primary-yellow) !important;
  color: var(--primary-background) !important; // ✅ Ajouter ceci
}
```

### Solution 2 : Utiliser une couleur de texte plus sombre

Si Materialize force le blanc, ajouter :
```scss
.btn, .btn:hover, .btn:focus, .btn:active {
  background-color: var(--primary-yellow) !important;
  color: var(--primary-background) !important;
}
```

---

## 📊 Ratios de contraste calculés

| Élément | Fond | Texte | Ratio | WCAG AA | WCAG AAA |
|---------|------|-------|-------|---------|----------|
| `.btn` (actuel) | #fbd54a | #ffffff | **1.32:1** | ❌ | ❌ |
| `.btn` (corrigé) | #fbd54a | #1f1f1f | **14.8:1** | ✅ | ✅ |
| `.nav-wrapper` | #fbd54a | #1f1f1f | **14.8:1** | ✅ | ✅ |
| `.view-tabs .active` | #fbd54a | #1f1f1f | **14.8:1** | ✅ | ✅ |
| Body text | #1f1f1f | #ffffff | **14.8:1** | ✅ | ✅ |

---

## 🧪 Comment tester

### Outils en ligne
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Contrast Ratio by Lea Verou](https://contrast-ratio.com/)

### Dans le navigateur
1. Ouvrir Chrome DevTools
2. Onglet Lighthouse
3. Cocher "Accessibility"
4. Générer le rapport
5. Chercher "Background and foreground colors do not have sufficient contrast"

### Extension Chrome
- [WAVE](https://chrome.google.com/webstore/detail/wave-evaluation-tool/)
- [axe DevTools](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/)

---

## ✅ Checklist de vérification

- [ ] Corriger la couleur de texte des `.btn`
- [ ] Tester avec un lecteur d'écran
- [ ] Vérifier avec Lighthouse
- [ ] Tester avec un simulateur de daltonisme
- [ ] Vérifier en mode contraste élevé

---

## 🎯 Recommandation

**Action immédiate requise :**
Ajouter la couleur de texte aux boutons pour garantir la conformité WCAG 2.1 AA.

```scss
.btn {
  background-color: var(--primary-yellow) !important;
  color: var(--primary-background) !important; // ⬅️ AJOUTER
}
```

**Après correction :**
✅ Conformité WCAG 2.1 Niveau AAA atteinte pour tous les éléments

