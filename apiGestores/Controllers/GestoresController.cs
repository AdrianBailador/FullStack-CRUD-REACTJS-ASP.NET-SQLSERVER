using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using apiGestores.Context;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace apiGestores.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GestoresController : Controller
    {
        private readonly AppDbContext context; 

        public GestoresController(AppDbContext context)
        {
            this.context = context;
        }

        // GET: api/<GestoresController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<GestoresController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<GestoresController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<GestoresController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<GestoresController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
