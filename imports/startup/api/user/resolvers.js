
export default {
    Query : {
        async user(obj, args, { user }){
            let userFull = {};
            if(user != undefined){
                userFull = Meteor.users.findOne({_id:user._id})
            }
            return userFull || {}
        },
        async allUsers(obj, args){
            let users = Meteor.users.find({}).fetch() || {};
            return users
        },
        async accounts(obj, args, {user}){
            return Meteor.users.find({}).fetch() || {};
        }
    },
    Mutation:{
        setUserAvatar(obj, {_id,avatar},{user}){
            if(user._id){
                const res = Meteor.users.update(
                    {
                        _id: _id
                    }, {
                        $set: {
                            "profile.avatar": avatar
                        }
                    }
                );
                return [{status:true,message:'Modification réussie'}];
            }
            throw new Error('Unauthorized')
        },
        setAdmin(obj, {admin,_id},{user}){
            if(user._id){
                const adminUser = Meteor.users.findOne({_id:admin});
                if(adminUser.settings.isAdmin){
                    const user = Meteor.users.findOne({_id:_id});
                    Meteor.users.update({
                        _id: _id
                    }, {
                        $set: {
                            "settings.isAdmin": true,
                        }
                    });
                }
                return [{status:true,message:'Mise à niveau du compte réussie'}];
            }
            throw new Error('Unauthorized')
        },
        unsetAdmin(obj, {admin,_id,societe},{user}){
            if(user._id){
                const adminUser = Meteor.users.findOne({_id:admin});
                if(adminUser.settings.isAdmin){
                    const user = Meteor.users.findOne({_id:_id});
                    Meteor.users.update({
                        _id: _id
                    }, {
                        $set: {
                            "settings.isAdmin": false,
                            "settings.visibility": societe,
                        }
                    });
                }
                return [{status:true,message:'Retrait de droits réussi'}];
            }
            throw new Error('Unauthorized')
        },
        setOwner(obj, {owner,_id},{user}){
            if(user._id){
                const ownerUser = Meteor.users.findOne({_id:owner});
                const adminUser = Meteor.users.findOne({_id:_id});
                if(ownerUser.settings.isOwner){
                    Meteor.users.update({
                        _id: adminUser._id
                    }, {
                        $set: {
                            "settings.isOwner": true,
                        }
                    });
                    /*Meteor.users.update({
                        _id: ownerUser._id
                    }, {
                        $set: {
                            "settings.isOwner": false,
                        }
                    });*/
                }
                return [{status:true,message:'Transfert de propriété réussie'}];
            }
            throw new Error('Unauthorized')
        },
        toggleActive(obj, {admin,_id},{user}){
            if(user._id){
                const adminUser = Meteor.users.findOne({_id:admin});
                if(adminUser.settings.isAdmin){
                    const user = Meteor.users.findOne({_id:_id});
                    Meteor.users.update({
                        _id: _id
                    }, {
                        $set: {
                            "settings.activated": !user.settings.activated,
                        }
                    });
                }
                return [{status:true,message:'Modification réussie'}];
            }
            throw new Error('Unauthorized')
        },
        deleteAccount(obj, {admin,_id},{user}){
            if(user._id){
                const adminUser = Meteor.users.findOne({_id:admin});
                if(adminUser.settings.isAdmin){
                    const res =  Meteor.users.remove(_id);

                    return [{status:true,message:'Compte supprimé'}];
                }
                return [{status:false,message:'Erreur durant la suppression'}];
            }
            throw new Error('Unauthorized')
        }
    }
}