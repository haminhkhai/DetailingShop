using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Blogs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BlogController : BaseApiController
    {
        [HttpPost]
        public async Task<ActionResult> CreateBlog(Blog blog)
        {
            return HandleResult(await Mediator.Send(new Add.Command { Blog = blog }));
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult> GetBlogs()
        {
            return HandleResult(await Mediator.Send(new List.Query { }));
        }

        [AllowAnonymous]
        [HttpGet("{category}")]
        public async Task<ActionResult> GetBlogsByCategory(string category)
        {
            return HandleResult(await Mediator.Send(new ListByCategory.Query { CategoryName = category }));
        }

        [AllowAnonymous]
        [HttpGet("{category}/{id}")]
        public async Task<ActionResult> GetBlog(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [AllowAnonymous]
        [HttpGet("search")]
        public async Task<ActionResult> SearchBlog([FromQuery] string value)
        {
            return HandleResult(await Mediator.Send(new Search.Query { Value = value }));
        }

        [HttpPut]
        public async Task<ActionResult> EditBlog(Blog blog)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Blog = blog }));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBlog(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}