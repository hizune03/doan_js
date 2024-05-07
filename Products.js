import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { Breadcrumb, Product,SearchItem } from '../../components'
import { apiGetProducts } from '../../apis'
import Masonry from 'react-masonry-css'


const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
};

const Products = () => {
    const [products, setProducts] = useState(null)
    const [activeClick, setactiveClick] = uaeState(null)
    const [params] = useSearchParams()

    const fetchProductsByCategory = async (queries) => {
        const response = await apiGetProducts(queries)
        if (response.sucess) setProducts(response.products)
    }
    const { catgory } = useParams()
    useEffect(() => {
        let param = []
        for (let i of params.entries()) param.push(i)
        const queries = {}
        for (let i of params) queries[i[0]] = i[1]
        console.log(param)    
        fetchProductsByCategory(queries)
    }, [])
    const changeActiveFilter = useCallback((name) => {
       if (activeClick === name) setactiveClick(null)
       else setactiveClick 
    },[activeClick]) 
    return (
        <div className='w-full'>
            <div className='h-[81px] flex justify- center items-center bg-gray-100'>
                <div className='w-main'>
                    <h3 className='font-semibold uppercase'>{catgory}</h3>
                    <Breadcrumb catgory={catgory} />
                </div>
            </div>
            <div className='w-main border p-4 flex justify-between mt-8 m-auto'>
                <div className='w-4/5 flex auto flex flex-col gap-3'>
                    <span className='font-semibold text-sm'>Filter by</span>
                    <div className='flex items-center gap-4'>
                        <SearchItem
                            name='price'
                            activeClick={activeClick}
                            changeActiveFilter={changeActiveFilter}
                            type='input'
                        
                        />
                        <SearchItem 
                            name='color'
                            activeClick={activeClick}
                            changeActiveFilter={changeActiveFilter}
                        />    
                    </div>        
                </div>
                <div className='w-1/5 flex'>
                    Sort by 
                </div>
            </div>
            <div className='mt-8 w-main m-auto'>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid flex mx-[-10px]"
                    columnClassName="my-masonry-grid_column">
                    {products?.map( el => (
                        <Product
                            key={el.id}
                            pid={el.id}
                            productData={el}
                            normal={true}
                        />
                    ))}
                </Masonry>    
            </div>        
            <div className='w-null h-[500px]'></div>
        </div>             
    )
}