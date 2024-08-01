import matplotlib.pyplot as plt
import networkx as nx

# Crear un gráfico de red para el ciclo DBTL
G = nx.DiGraph()
G.add_edges_from([('Diseño', 'Construcción'), ('Construcción', 'Prueba'), ('Prueba', 'Aprendizaje'), ('Aprendizaje', 'Diseño')])

pos = nx.circular_layout(G)

plt.figure()
nx.draw(G, pos, with_labels=True, node_color='skyblue', node_size=3000, edge_color='gray', linewidths=2, font_size=15, arrowsize=20)
plt.title('Ciclo DBTL')

plt.show()
