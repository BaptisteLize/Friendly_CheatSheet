## Opérateurs de comparaison

[Documentation pour Opérateurs](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators)

```js
// Retourne uniquement les cadeaux
// dont le temps de fabriquation est supérieur à cinq jours

const fiveDaysPresent = await Present.findAll({
    where: {
      craft_time_in_days: { [Op.gt]: 5 }
    }
  });
  return fiveDaysPresent;
}
```
