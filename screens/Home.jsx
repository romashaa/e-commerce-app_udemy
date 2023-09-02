import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {colors, defaultStyle} from "../styles/styles";
import Header from "../components/Header";
import {Avatar, Button} from "react-native-paper";
import SearchModal from "../components/SearchModal";
import ProductCard from "../components/ProductCard";
import {useNavigation} from "@react-navigation/native";
import Footer from "../components/Footer";


const categories = [{category:"Nice", _id:1},
    {category:"Football", _id:2},
    {category:"Man", _id:3},
    {category:"Women", _id:4},
    {category:"Women", _id:5},
    {category:"Women", _id:6},
    {category:"Women", _id:7},
]
const products=[
    {
        price:2131,
        stock:23,
        name:"Sample",
        _id:"fedfdsf",
        images:[{
            url:"https://picsum.photos/200/300"
        }],

    },
    {
        price:2131,
        stock:23,
        name:"Macbook",
        _id:"vxcvxv",
        images:[{
            url:"https://picsum.photos/200/300"
        }],

    },

];

const Home = () => {

    const[category, setCategory] = useState("")
    const[activeSearch, setActiveSearch] = useState(false)
    const[searchQuery, setSearchQuery]=useState("")

    const navigate = useNavigation();


    const categoryButtonHandler = (id) => {
        setCategory(id)
    }
    const addToCartHandler = (id) => {
        console.log("Add to cart ", id)
    }


    return (

        <>
            {
                activeSearch && (
                    <SearchModal searchQuery={searchQuery}
                                 setActiveSearch={setActiveSearch}
                                 setSearchQuery={setSearchQuery}
                                 products={products}
                    />
                )
            }
            <View style={defaultStyle}>
                <Header/>
                <View style={{
                    paddingTop:70,
                    flexDirection:"row",
                    justifyContent:"space-between",
                    alignItems:"center"
                }}>
                    <View>
                        <Text style={{fontSize: 25}}>Our</Text>
                        <Text style={{fontSize: 25, fontWeight:"900"}}>Products</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={()=>setActiveSearch((prev)=>!prev)}>
                            <Avatar.Icon
                                icon={"magnify"}
                                color={"gray"}
                                size={50}
                                style={{
                                    backgroundColor:colors.color2,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.4,
                                    shadowRadius: 2
                                }}/>
                        </TouchableOpacity>
                    </View>
                </View>

                {/*Categories*/}
                <View
                    style={{
                        flexDirection:"row",
                        height:80,
                    }}
                >
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{alignItems:"center"}}>
                        {categories.map((item, index)=>(
                            <Button
                                key={item._id}
                                style={{
                                    backgroundColor: category===item._id ? colors.color1 : colors.color5,
                                    borderRadius:100,
                                    margin:5
                                }}
                                onPress={()=>categoryButtonHandler(item._id)}
                            >

                                <Text style={{
                                    color:category===item._id? colors.color2 : "grey",
                                    fontSize:12}}>
                                    {item.category}
                                </Text>
                            </Button>
                        ))
                        }
                    </ScrollView>
                </View>

                {/*Products*/}

                <View style={{
                    flex:1
                }}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {products.map((item, index)=>(
                            <ProductCard
                                stock={item.stock}
                                name={item.name}
                                price={item.price}
                                image={item.images[0]?.url}
                                addToCartHandler={addToCartHandler}
                                id={item._id}
                                key={item._id}
                                i={index}
                                navigate={navigate}
                            />
                        ))}
                    </ScrollView>
                </View>
            </View>
            <Footer activeRoute={"home"}/>
        </>
    );
};

export default Home;