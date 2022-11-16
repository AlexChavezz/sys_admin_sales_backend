// -> Functoin that from a role string return a valid role
function getRole(roleId)
{
    let roleIdStatus = null;
    roleId === "ADMIN" ? (roleIdStatus = 1) : true;
    roleId === "EMPLOYED" ? (roleIdStatus = 2) : true;
    return roleIdStatus;
}


module.exports = {
    getRole,
}