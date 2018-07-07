using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApiJwtBearer.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            var data = new { text = "Got data from server" };
            return Ok(data);
        }   
    }
}