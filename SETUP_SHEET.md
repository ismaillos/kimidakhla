# Setup Sheet

Sheet ID: `1SsoBsyTOH7t57CiVZWVdn1TzevHDOEh8dAxDl6iQnZw`

Tab name: `dakhlacommande`

## Webhook URL

Le webhook est deploye comme Web App sur Google Apps Script.

URL actuelle : `https://script.google.com/macros/s/AKfycbx_PLACEHOLDER/exec`

## Colonnes du Sheet

| Colonne | Contenu |
|---------|---------|
| A | Date |
| B | Nom |
| C | Telephone |
| D | Adresse |
| E | Ville |
| F | Produit |
| G | Quantite |
| H | Prix Total |
| I | Statut |

## Redeploiement

Apres modification de `apps-script.gs` :
1. Sauvegarder le projet
2. Deploy > New deployment
3. Type: Web app
4. Execute as: Me
5. Who has access: Anyone
6. Copier la nouvelle URL
7. Mettre a jour `VITE_SHEET_WEBHOOK_URL` dans `.env`
