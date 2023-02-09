<h1 align="center">Mars</h1>

Os veículos navegam por uma plataforma retangular, de modo que as câmeras que eles carregam tenham uma visão panorâmica e assim enviem à Terra todas as informações sobre o terreno. A posição e a localização de um veículo são representadas pela combinação de coordenadas na forma X e Y e uma letra representando um dos quatro pontos cardeais. A plataforma é dividida em uma grade para simplificar a navegação. 

- `E` e `D` fazem o veículo virar 90 graus para a esquerda e para a direita, respectivamente, sem sair do lugar.
- `M` faz o veículo se mover um ponto na grade e mantem virado na mesma direção em que estava.

#### Input
```
5 5
1 2 N
EMEMEMEMM
3 3 L
MMDMMDMDDM
```

#### Output
```
1 3 N
5 1 L
```

## Instruções:
Antes de executar o programa, é necessário instalar as dependências: 
```
yarn install 
```

Para rodar o programa execute os testes:
```
yarn jest 
```
