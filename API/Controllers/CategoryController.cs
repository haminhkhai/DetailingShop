using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Categories;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CategoryController : BaseApiController
    {
        [HttpPost]
        public async Task<ActionResult> CreateCategory(Category category)
        {
            var result = await Mediator.Send(new Add.Command { Category = category });
            if (!result.IsSuccess && result.Error.Equals("Category name taken")) 
            {
                ModelState.AddModelError("name", "Category name taken");
                return ValidationProblem();
            }
            return HandleResult(result);
        }

        [HttpGet]
        public async Task<ActionResult> GetCategories()
        {
            return HandleResult(await Mediator.Send(new List.Query { }));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetCategory(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpPut]
        public async Task<ActionResult> EditCategory(Category category)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Category = category }));
        }
    }
}