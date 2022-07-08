{**
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *}
<section class="category-products mt-3">
  {if $products|@count == 1}
    {include file="components/section-title.tpl" title={l s='%s other product in the same category' sprintf=[$products|@count] d='Shop.Theme.Catalog'}}
  {else}
    {include file="components/section-title.tpl" title={l s='%s other products in the same category' sprintf=[$products|@count] d='Shop.Theme.Catalog'}}
  {/if}

  {include file="catalog/_partials/productlist.tpl" products=$products cssClass="row" productClass="col-12 col-sm-6 col-lg-4 col-xl-3"}
</section>
