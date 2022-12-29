import axios from "axios";

/* Use this middleware to handle all API responses and redirects from the server. Collapse error handling to this level, and drop redirects and session management.

Uses the axios framweowrk, and has a wrapper for error handling

*/
class apiHandler{
constructor()
{
    axios.defaults.withCredentials = true;
}


}

export default apiHandler