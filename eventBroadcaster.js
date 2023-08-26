let clients = [];

function sendEventsToAll(newData) {
  clients.forEach((client) =>
    client.write(`data: ${JSON.stringify(newData)}\n\n`),
  );
}

function addClient(client) {
  clients.push(client);
}

function removeClient(client) {
  clients = clients.filter((c) => c !== client);
}

module.exports = { sendEventsToAll, addClient, removeClient };
