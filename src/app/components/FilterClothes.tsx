'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface FilterCategory {
  name: string;
  slug: string;
  subcategories?: FilterCategory[];
}

const filterCategories: FilterCategory[] = [
  {
    name: 'All Products',
    slug: 'all',
  },
  {
    name: 'Size',
    slug: 'size',
    // Render sizes
    subcategories: [
      { name: "All Women's", slug: 'women' },
      { name: "Women's Dresses", slug: 'womens-dresses' },
      { name: "Women's Shoes", slug: 'womens-shoes' },
      { name: "Women's Bags", slug: 'womens-bags' },
      { name: "Women's Jewellery", slug: 'womens-jewellery' },
      { name: "Women's Watches", slug: 'womens-watches' },
    ],
  },
  {
    name: 'season',
    slug: 'season',
    subcategories: [
      { name: 'Winter', slug: 'winter' },
      { name: 'Spring', slug: 'spring' },
      { name: 'Summer', slug: 'summer' },
      { name: 'Autumn', slug: 'autumn' },
    ],
  },
];

export default function FilterClothes() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const createUrl = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    return `${pathname}?${params.toString()}`;
  };

  const isActive = (slug: string) => {
    if (slug === 'all' && (!currentCategory || currentCategory === 'all')) {
      return true;
    }
    return currentCategory === slug;
  };

  const toggleCategory = (categorySlug: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categorySlug)
        ? prev.filter((slug) => slug !== categorySlug)
        : [...prev, categorySlug],
    );
  };

  const isParentActive = (category: FilterCategory) => {
    if (!category.subcategories) return false;
    return category.subcategories.some((sub) => isActive(sub.slug));
  };

  return (
    <div className='w-full lg:w-64 bg-white rounded-lg border border-gray-200 h-fit sticky top-4'>
      <div className='p-6'>
        <h2 className='text-lg font-semibold text-gray-900 mb-4'>Filters</h2>

        <div className='space-y-1'>
          {filterCategories.map((category) => (
            <div
              key={category.slug}
              className='border-b border-gray-100 last:border-b-0'
            >
              <div className='py-2'>
                {category.subcategories ? (
                  // Category with subcategories
                  <div>
                    <button
                      onClick={() => toggleCategory(category.slug)}
                      className={`flex items-center justify-between w-full text-left py-1 text-sm font-medium transition-colors ${
                        isParentActive(category)
                          ? 'text-gray-900'
                          : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      <span>{category.name}</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          expandedCategories.includes(category.slug)
                            ? 'rotate-180'
                            : ''
                        }`}
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M19 9l-7 7-7-7'
                        />
                      </svg>
                    </button>

                    {/* Subcategories */}
                    {expandedCategories.includes(category.slug) && (
                      <div className='pl-4 pt-2 pb-2 space-y-1'>
                        {category.subcategories.map((subcategory) => (
                          <Link
                            key={subcategory.slug}
                            href={createUrl(subcategory.slug)}
                            className={`block py-1 text-sm transition-colors ${
                              isActive(subcategory.slug)
                                ? 'text-gray-900 font-semibold'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            {subcategory.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Direct link category (All Products)
                  <Link
                    href={createUrl(category.slug)}
                    className={`block py-1 text-sm font-medium transition-colors ${
                      isActive(category.slug)
                        ? 'text-gray-900 font-semibold'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    {category.name}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Apply Filter Button */}
        <div className='mt-6 pt-6 border-t border-gray-200'>
          <button className='w-full px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-md transition-colors text-center'>
            Apply Filter
          </button>
        </div>

        {/* Clear Filters */}
        <div className='mt-3'>
          <Link
            href='/products'
            className='w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-center block'
          >
            Clear All Filters
          </Link>
        </div>
      </div>
    </div>
  );
}
