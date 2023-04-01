import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { useTranslation } from 'react-i18next';


const Filters = () => {

  const {
    filters: {
      text,
      category,
      company,
      min_price,
      max_price,
      price,
    },
    updateFilters,
    clearFilters,
    all_products,
  } = useFilterContext();

  const categories = getUniqueValues(all_products, "category");
  const companies = getUniqueValues(all_products, "company");
  const { t } = useTranslation()

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder={t('filters-placeholder')}
              className="search-input"
              value={text}
              onChange={updateFilters}
            />
          </div>
          <div className="form-control">
            <h5>{t('filters-title-1')}</h5>
            <div>
              {categories.map((c, index) => {
                return (
                  <button
                    key={index}
                    onClick={updateFilters}
                    name="category"
                    type="button"
                    className={`${category === c.toLowerCase() ? "active" : null
                      }`}
                  >
                    {/*{c}*/}

                    {
                      c === "all" &&
                      <>{t('filter-category-name-1')}</>
                    }
                    {
                      c === "квартиры" &&
                      <>{t('filter-category-name-2')}</>
                    }
                    {
                      c === "дуплексы" &&
                      <>{t('filter-category-name-3')}</>
                    }
                    {
                      c === "земля" &&
                      <>{t('filter-category-name-4')}</>
                    }
                    {
                      c === "виллы" &&
                      <>{t('filter-category-name-5')}</>
                    }
                    {
                      c === "офисы" &&
                      <>{t('filter-category-name-6')}</>
                    }
                    {
                      c === "магазины" &&
                      <>{t('filter-category-name-7')}</>
                    }
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-control">
            <h5>{t('filters-title-2')}</h5>
            <select
              name="company"
              value={company}
              onChange={updateFilters}
              className="company"
            >
              {companies.map((c, index) => {
                return (
                  <option key={index}
                    value={c}
                  >
                    {c}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-control">
            <h5>{t('filters-title-3')}</h5>
            {/* <p className="price">{formatPrice(price)}</p>
 */}            <p className="price">{price}$</p>
            <input
              type="range"
              name="price"
              onChange={updateFilters}
              min={min_price}
              max={max_price}
              value={price}
            />
          </div>
        </form>
        <button type="button" className="clear-btn" onClick={clearFilters}>
          {t('filters-title-4')}
        </button>
      </div>
    </Wrapper>
  )
};

const Wrapper = styled.section`
  .content {
    position: sticky;
    top: 6rem;
  }
  
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
      text-transform: none;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 6rem;
    }
  }
`;

export default Filters;
