// init-replica.js
const rsConfig = {
    _id: 'rs0',
    members: [{
      _id: 0,
      host: `localhost:27017`
    }]
  };
  
  const userConfig = {
    user: 'rootuser',
    pwd: 'rootpass',
    roles: [ 'root' ]
  };
  
  try {
    rs.initiate(rsConfig);
    print('Replica set initiated');
  } catch (e) {
    print('Error initiating replica set:', e);
  }
  
  try {
    db = db.getSiblingDB('admin');
    db.createUser(userConfig);
    print('Root user created');
  } catch (e) {
    print('Error creating root user:', e);
  }
  