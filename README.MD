


[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

# Zs Control

A lib ```zs-control``` tem a mesma ideia do zustand e redux pra controle de estado, porém o zs-control tem uma ideia de implementar novas funcionaldidades e novas ideias. A ideia de criar um canal de eventos onde possa ouvir e publicar ( parecido com golang ) e também a parte de observar qualquer mudar da aplicação é um forte chave dessa lib. O objetivo é tentar resolver problemas simples e criar métodos padrão para problemas na o web. 


## Autores

- [@vitusupermeg](https://www.github.com/VituSuperMEg)


## Uso/Exemplos

Usando o ```createStateMangement``` você pode criar um estado simples onde você tera um grande controle de sua aplicação.

```javascript
import { z } from "zs-control";

interface AuthState {
  name: string;
  token: string;
}

export const useAuth = z.createStateManagement<AuthState>({
  state: () => ({
    name: "",
    token: "",
  }),
  set: (update) => ({
    setName: (name: string) => update({ name }),
  }),
});

```

Dentro do zs-control vamos encontrar a ```zStorage``` tem o papel de criar o storage de suas aplicação usando o hook criado como refência de estado para ter uma melhor performance e controle.

```javascript
import { zStorage } from "zs-control";
import { useAuth } from "../hook/useAuth";

export const myStorageAuth = zStorage.setHook(useAuth).key("auth").config({
  typeStorage: "localStorage",
});
```
Já pensou em criar uma variável que morre durante o tempo que você quiser o uma função para visualizar qualquer alteração e retornar para o valor inicial com ```z.temp``` você pode fazer isso e suas possibildade são enorme
```javascript
import { z } from "zs-control";

export const useTempValue = () =>
  z.temp({
    value: 0,
    watch: () => false,
    timeDestory: 5000,
  });

```
