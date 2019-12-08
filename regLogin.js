let registeredUsers = [];
let activeUser = null;
let inventory = [];
let params = new URLSearchParams(location.search);

window.onload = () =>
{
    if(localStorage.getItem("registeredUsers") !== null)
    {
        registeredUsers = JSON.parse(localStorage.getItem("registeredUsers"));
    }

    if(localStorage.getItem("activeUser") !== null)
    {
        activeUser = JSON.parse(localStorage.getItem("activeUser"));
        disableLoginFields();
        enableLogoutFields();
        setActiveUser();
        enableActiveUserFields();
    }
    
    //only render if on category page
    if(document.getElementById("itemList") !== null)
    {
        //if inventory is empty pull from json
        if(inventory.length === 0)
        {
            populateInventory();
            //temp
                // populateInventory();
                // populateInventory();
                // populateInventory();
                // populateInventory();
                // populateInventory();
                // populateInventory();
                // populateInventory();
                // populateInventory();
                // populateInventory();
            //temp
        }
        filterItemList();
        renderItemList();
        renderSideBar();
        showSidebarReset();
    }

    attachListeners();
}

function populateInventory()
{
    for(let i = 0; i < inventory_JSON.length; i++)
    {
        inventory.push(inventory_JSON[i]);
        //temp
            console.log(inventory_JSON[i]);
        //temp
    }
}

function filterItemList()
{
    if(params.has('category'))
    {
        console.log(params.get('category'));
        inventory = inventory.filter( e => 
            {
                return e.productCategory == params.get('category');
            });
    }
    if(params.has('brand'))
    {
        console.log(params.get('brand'));
        inventory = inventory.filter( e => 
            {
                return e.productBrand == params.get('brand');
            });

    }
    if(params.has('pricelowerlimit'))
    {
        console.log(params.get('pricelowerlimit'));
        switch(params.get("pricelowerlimit"))
        {
            case "0":
            {
                inventory = inventory.filter(e => 
                    {
                        return e.productPrice <= "50";
                    });
                break;
            }
            case "50":
            {
                inventory = inventory.filter(e => 
                    {
                        return e.productPrice >= "50";
                    });
                inventory = inventory.filter(e => 
                    {
                        return e.productPrice <= "100";
                    })
                break;
            }
            case "100":
            {
                inventory = inventory.filter(e => 
                    {
                        return e.productPrice >= "100";
                    });
                inventory = inventory.filter(e => 
                    {
                        return e.productPrice <= "200";
                    })
                break;
            }
            case "200":
            {
                inventory = inventory.filter(e => 
                    {
                        return e.productPrice >= "200";
                    });
                break;
            }
        }

    }
}

function filterRedirect(filterOption, filterString)
{
    let urlString = "./category.html?"

    //append filters here
    if(filterOption == "category")
    {
        if(filterString !== "reset")
        {
            urlString += "category=" + filterString + "&";
        }
    }
    else
    {
        if(params.has("category"))
        {
            urlString += "category=" + params.get("category") + "&";
        }
    }

    if(filterOption == "brand")
    {
        if(filterString !== "reset")
        {
            urlString += "brand=" + filterString + "&";
        }
    }
    else
    {
        if(params.has("brand"))
        {
            urlString += "brand=" + params.get("brand") + "&";
        }
    }

    if(filterOption == "pricelowerlimit")
    {
        if(filterString !== "reset")
        {
            urlString += "pricelowerlimit=" + filterString + "&"
        }
    }
    else
    {
        if(params.has("pricelowerlimit"))
        {
            urlString += "pricelowerlimit=" + params.get("pricelowerlimit") + "&"
        }
    }

    window.location.href = urlString;
}

function renderItemList()
{
    //temp
        let tempTotal = 0;
    //temp

    let temp = document.getElementById("itemList");
    for(let i = 0; i < inventory.length; i++)
    {
        let tempItem = document.createElement("div");
        tempItem.className = "item";
        tempItem.id = inventory[i].productID;

        let tempImage = document.createElement("img");
        tempImage.src = inventory[i].productImage;
        tempImage.className = "itemImage";

        let tempName = document.createElement("div");
        tempName.innerHTML = inventory[i].productBrand + "<br>" + inventory[i].productName;
        tempName.className = "itemName";

        let tempPrice = document.createElement("div");
        tempPrice.className = "itemPrice";
        tempPrice.innerHTML = "$" + inventory[i].productPrice;
        //temp
            tempTotal += parseFloat(inventory[i].productPrice);
        //temp

        let tempCartForm = document.createElement("div");
        tempCartForm.className = "itemCartForm";

        let tempForm = document.createElement("form");
        tempForm.setAttribute("onsubmit", "return false");

        let tempSelect = document.createElement("select");
        tempSelect.className = "itemQty";
        for(let i = 1; i < 4; i++)
        {
            let tempOption = document.createElement("option");
            tempOption.value = i;
            tempOption.text = i;
            tempSelect.appendChild(tempOption);
        }

        let tempButton = document.createElement("button");
        tempButton.innerHTML = "Add To Cart";
        tempButton.className = "addButton";

        tempForm.appendChild(tempSelect);
        tempForm.appendChild(tempButton);
        tempCartForm.appendChild(tempForm);

        tempItem.appendChild(tempImage);
        tempItem.appendChild(tempName);
        tempItem.appendChild(tempPrice);
        tempItem.appendChild(tempCartForm);

        temp.appendChild(tempItem);
    }
    //temp
        console.log(tempTotal);
    //temp
}

function renderSideBar()
{
    //build side bar off of filtered item list
    let categoryList = [];
    let brandList = [];
    for(let i = 0; i < inventory.length; i++)
    {
        if(!categoryList.includes(inventory[i].productCategory))
        {
            categoryList.push(inventory[i].productCategory);
        }
        if(!brandList.includes(inventory[i].productBrand))
        {
            brandList.push(inventory[i].productBrand);
        }
    }

    let headerUL = document.createElement("ul");
    headerUL.id = "headerUL";

    //category
    let categoryHeader = document.createElement("li");
    categoryHeader.innerHTML = "CATEGORY <span id='categoryReset' class='filterReset'> - CLEAR</span>";
    categoryHeader.className = "sidebarHeader";
    headerUL.appendChild(categoryHeader);

    let categoryUL = document.createElement("ul");
    for(let i = 0; i < categoryList.length; i++)
    {
        let tempLI = document.createElement("li");
        tempLI.innerHTML = categoryList[i];
        tempLI.style.cursor = "pointer";
        tempLI.onclick = () =>
        {
            filterRedirect("category", categoryList[i]);
        };
        categoryUL.appendChild(tempLI);
    }

    let categoryLI = document.createElement("li");
    categoryLI.appendChild(categoryUL);
    headerUL.appendChild(categoryLI);


    //brand
    let brandHeader = document.createElement("li") 
    brandHeader.innerHTML = "BRAND <span id='brandReset' class='filterReset'> - CLEAR</span>";
    brandHeader.className = "sidebarHeader";
    headerUL.appendChild(brandHeader);

    let brandUL = document.createElement("ul");
    for(let i = 0; i < brandList.length; i++)
    {
        let tempLI = document.createElement("li");
        tempLI.innerHTML = brandList[i];
        tempLI.style.cursor = "pointer";
        tempLI.onclick = () =>
        {
            filterRedirect("brand", brandList[i]);
        };
        brandUL.appendChild(tempLI);
    }

    let brandLI = document.createElement("li");
    brandLI.appendChild(brandUL);
    headerUL.appendChild(brandLI);

    //price
    let priceHeader = document.createElement("li");
    priceHeader.innerHTML = "PRICE <span id='priceReset' class='filterReset'> - CLEAR</span>";
    priceHeader.className = "sidebarHeader";
    headerUL.appendChild(priceHeader);

    let priceUL = document.createElement("ul");

    let price0to50 = document.createElement("li");
    price0to50.innerHTML = "Under $50";
    price0to50.style.cursor = "pointer";
    price0to50.onclick = () =>
    {
        filterRedirect("pricelowerlimit", "0");
    };
    price0to50.id = "price0to50";
    priceUL.appendChild(price0to50);

    let price50to100 = document.createElement("li");
    price50to100.innerHTML = "$50 to $100";
    price50to100.style.cursor = "pointer";
    price50to100.onclick = () =>
    {
        filterRedirect("pricelowerlimit", "50");
    };
    price50to100.id = "price50to100";
    priceUL.appendChild(price50to100);

    let price100to200 = document.createElement("li");
    price100to200.innerHTML = "$100 to $200";
    price100to200.style.cursor = "pointer";
    price100to200.onclick = () =>
    {
        filterRedirect("pricelowerlimit", "100");
    };
    price100to200.id = "price100to200";
    priceUL.appendChild(price100to200);

    let price200toMax = document.createElement("li");
    price200toMax.innerHTML = "$200 & Up";
    price200toMax.style.cursor = "pointer";
    price200toMax.onclick = () =>
    {
        filterRedirect("pricelowerlimit", "200");
    };
    price200toMax.id = "price200toMax";
    priceUL.appendChild(price200toMax);

    if(params.has("pricelowerlimit"))
    {
        switch(params.get("pricelowerlimit"))
        {
            case "0":
            {
                priceUL.removeChild(price50to100);
                priceUL.removeChild(price100to200);
                priceUL.removeChild(price200toMax);
                break;
            }
            case "50":
            {   
                priceUL.removeChild(price0to50);
                priceUL.removeChild(price100to200);
                priceUL.removeChild(price200toMax);
                break;
            }
            case "100":
            {
                priceUL.removeChild(price0to50);
                priceUL.removeChild(price50to100);
                priceUL.removeChild(price200toMax);
                break;
            }
            case "200":
            {
                priceUL.removeChild(price0to50);
                priceUL.removeChild(price50to100);
                priceUL.removeChild(price100to200);
                break;
            }
        }
    }

    headerUL.appendChild(priceUL);

    document.getElementById("sideBarList").appendChild(headerUL);
}

function showSidebarReset()
{
    if(params.has("category"))
    {
        if(document.getElementById("categoryReset") !== null)
        {
            document.getElementById("categoryReset").style.display = "inline";
            document.getElementById("categoryReset").onclick = () =>
            {
                filterRedirect("category", "reset");
            };
        }
    }
    if(params.has("brand"))
    {
        if(document.getElementById("brandReset") !== null)
        {
            document.getElementById("brandReset").style.display = "inline";
            document.getElementById("brandReset").onclick = () =>
            {
                filterRedirect("brand", "reset");
            };
        }
    }
    if(params.has("pricelowerlimit"))
    {
        if(document.getElementById("priceReset") !== null)
        {
            document.getElementById("priceReset").style.display = "inline";
            document.getElementById("priceReset").onclick = () =>
            {
                filterRedirect("pricelowerlimit", "reset");
            };
        }
    }
}

function attachListeners()
{    
    document.getElementById("loginForm").addEventListener("submit", () => {
        loginUser(document.getElementById("loginEmail").value, document.getElementById("loginPassword").value);
    });

    document.getElementById("logoutButton").addEventListener("click", () => {
        logoutUser();
    });

    if(document.getElementById("signUpButton") !== null)
    {
        document.getElementById("signUpButton").addEventListener("click", () => {
            window.location.href = "./registration.html";
        });
    }

    if(document.getElementById("registerForm") !== null)
    {
        document.getElementById("registerForm").addEventListener("submit", () => {
            registerUser();
        });
    }
}

function registerUser()
{
    if(isUserRegistered())
    {
        alert("USER ALREADY EXISTS");
        return; 
    }    
    if(!isUserInfoValid())
    {
        alert("PASSWORDS DO NOT MATCH");
        return;
    }

    createUser();
    
    loginUser(document.getElementById("registerEmail").value, document.getElementById("registerPassword1").value);
    alert("USER CREATED");
    window.location.href = "./index.html";
}

function isUserInfoValid()
{
    if(document.getElementById("registerPassword1").value !== document.getElementById("registerPassword2").value)
    {
        return false;
    }
    else
    {
        return true;
    }
}

function isUserRegistered()
{
    let isUserInList = false;
    for(user of registeredUsers)
    {
        if(user.email === document.getElementById("registerEmail").value)
        {
            isUserInList = true;
            break;
        }
    }
    if(!isUserInList)
    {
        return false;        
    }
    else
    {
        return true;
    }
}

function createUser()
{
    let newUser = 
    {
        email: document.getElementById("registerEmail").value,
        password: document.getElementById("registerPassword1").value
        //TODO - add cart here for user
    }

    registeredUsers.push(newUser);
    saveUsersToLocalStorage();
}

function saveUsersToLocalStorage()
{
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
}

function saveActiveUserToLocalStorage()
{
    localStorage.setItem("activeUser", JSON.stringify(activeUser));
}

function setActiveUser()
{
    document.getElementById("usernameLabel").innerHTML = activeUser.email;
}

function loginUser(email, password)
{
    for(user of registeredUsers)
    {
        if(user.email === email)
        {
            if(user.password === password)
            {
                disableLoginFields();
                enableLogoutFields();

                    activeUser = user;
                    saveActiveUserToLocalStorage();
                    setActiveUser();
                    enableActiveUserFields();

                //TODO - move any items in the cart to the users cart -- may need to merge items in the cart
                return;
            }
            else
            {
                alert("PASSWORD IS INCORRECT");
            }
            return;
        }
    }
    alert("USER DOES NOT EXIST");
}

function logoutUser()
{
    enableLoginFields();
    disableLogoutFields();
    disableActiveUserFields();
    activeUser = null;
    localStorage.removeItem("activeUser");
}

function disableLoginFields()
{
    document.getElementById("loginButton").style.display = "none";
    document.getElementById("loginEmail").style.display = "none";
    document.getElementById("loginPassword").style.display = "none";
    if(document.getElementById("signUpButton") !== null)
    {
        document.getElementById("signUpButton").style.display = "none";
    }
}

function enableLoginFields()
{
    document.getElementById("loginButton").style.display = "inline";
    document.getElementById("loginEmail").style.display = "inline";
    document.getElementById("loginPassword").style.display = "inline";
    if(document.getElementById("signUpButton") !== null)
    {
        document.getElementById("signUpButton").style.display = "inline";
    }
}

function disableLogoutFields()
{
    document.getElementById("logoutButton").style.display = "none";
}

function enableLogoutFields()
{
    document.getElementById("logoutButton").style.display = "inline";
}

function enableActiveUserFields()
{
    document.getElementById("usernameLabel").style.display = "inline";
}

function disableActiveUserFields()
{
    document.getElementById("usernameLabel").style.display = "none";
}
