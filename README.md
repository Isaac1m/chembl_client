# chembl_client
#### Fetches activity data for the specified targets and molecules. All activities without a *_pCHEMBL_* value are filtered out. The data is then exported to a JSON file stored in **public/data/db.json**. The data is then plotted according to the pCHEMBL for each target - molecule pair.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development (using data stored in public/data/db.json)
```
npm run serve
```

### To fetch data for new targets and/or molecules and save it to public/data/db.json
```
npm run fetch_data
```
### To export the (db.json) data to a csv file
```
npm run export_data
```

### Lints and fixes files
```
npm run lint
```
