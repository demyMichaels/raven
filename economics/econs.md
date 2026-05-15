Models have two kinds of variables: 
endogenous variables and exogenous variables. 

Endogenous variables are those variables that a model tries to explain.

Exogenous variables are those variables that a model takes as given.


The purpose of a model is to show how the exogenous variables affect the endogenous variables. 

In other words, as Figure 1-4 illustrates, exogenous variables come from outside the model 
and serve as the model’s input, 

whereas endogenous variables are determined inside the model and are the model’s output.


To make these ideas more concrete, let’s review the most celebrated of all economic
models—the model of supply and demand. 

Imagine that an economist were interested in figuring out what factors influence THE PRICE OF PIZZA and the quantity of pizza sold. 

He or she would DEVELOP A MODEL that described the behavior of pizza buyers, 
the behavior of pizza sellers, 
and their interaction in the MARKET for pizza


For example, the economist supposes that the quantity of pizza demanded by consumers Qd depends on the price of pizza P and on aggregate income Y.

This relationship is expressed in the equation
Qd = D(P, Y),
where D( ) represents the demand function. 

Similarly, the economist supposes
that the quantity of pizza supplied by pizzerias Qs depends on the price of pizza P 
and on the price of materials Pm, 
such as 
cheese, 
tomatoes, 
flour, and 
anchovies.

This relationship is expressed as
Qs = S(P, Pm),
where S( ) represents the supply function. Finally, the economist assumes that the
price of pizza adjusts to bring the quantity supplied and quantity demanded into
balance:
Qs = Qd.
These three equations compose a model of the market for pizza.

The economist illustrates the model with a supply-and-demand diagram, as in
Figure 1-5.


qUESTION: 
1. dO WE use a table of these data to feed the functions? What if we want to automate it into python/Ai for analysis?
2. What if we watnt to build a model of the market for education?


The demand curve shows the relationship between the quantity of pizza demanded and the price of pizza, while holding aggregate income constant


The demand curve slopes downward because a higher price of pizza encourages consumers to switch to other foods and buy less pizza.


The supply curve shows the relationship between the quantity of pizza supplied and the price of
pizza, while holding the price of materials constant.

The supply curve slopes upward
because a higher price of pizza makes selling pizza more profitable, which
encourages pizzerias to produce more of it.


The equilibrium for the market is the
price and quantity at which the supply and demand curves intersect.At the equilibrium
price, consumers choose to buy the amount of pizza that pizzerias
choose to produce.

This model of the pizza market has two exogenous variables and two endogenous
variables. The exogenous variables are aggregate income and the price of
materials.The model does not attempt to explain them but takes them as given
(perhaps to be explained by another model). The endogenous variables are the price of pizza and the quantity of pizza exchanged. These are the variables that
the model attempts to explain.

The model can be used to show how a change in one of the exogenous variables
affects both endogenous variables. 

For example, if aggregate income increases,
then the demand for pizza increases, as in panel (a) of Figure 1-6. 

The model shows that both the equilibrium price and the equilibrium quantity of pizza rise. 

Similarly, if the price of materials increases, then the supply of pizza decreases, as in panel (b) of Figure 1-6. 

The model shows that in this case the
equilibrium price of pizza rises and the equilibrium quantity of pizza falls.

Thus, the model shows how changes in aggregate income or in the price of materials affect price and quantity in the market for pizza.

Like all models, this model of the pizza market makes simplifying assumptions.
The model does not take into account, for example, that every pizzeria is in a
different location. For each customer, one pizzeria is more convenient than the
others, and thus pizzerias have some ability to set their own prices.Although the
model assumes that there is a single price for pizza, in fact there could be a different
price at every pizzeria.
How should we react to the model’s lack of realism? Should we discard the
simple model of pizza supply and pizza demand? Should we attempt to build a
more complex model that allows for diverse pizza prices? The answers to these
questions depend on our purpose. 

If our goal is to explain how the price of
cheese affects the average price of pizza and the amount of pizza sold, then the diversity of pizza prices is probably not important.
The simple model of the pizza market does a good job of addressing that issue.

Yet if our goal is to explain why towns with three pizzerias have lower pizza prices than towns with one pizzeria, the simple model is less useful.


Using Functions to Express Relationships
Among Variables
All economic models express relationships
among economic variables. Often, these relationships
are expressed as functions. A function is a
mathematical concept that shows how one variable
depends on a set of other variables. For example,
in the model of the pizza market, we said
that the quantity of pizza demanded depends on
the price of pizza and on aggregate income. To
express this, we use functional notation to write
Qd = D(P, Y).
This equation says that the quantity of pizza demanded
Qd is a function of the price of pizza P
and aggregate income Y. In functional notation,
the variable preceding the parentheses denotes
the function. In this case, D( ) is the function expressing
how the variables in parentheses determine
the quantity of pizza demanded.
If we knew more about the pizza market, we
could give a numerical formula for the quantity
of pizza demanded. We might be able to write
Qd = 60 - 10P + 2Y.

In this case, the demand function is
D(P, Y) = 60 - 10P + 2Y.
For any price of pizza and aggregate income, this
function gives the corresponding quantity of
pizza demanded. For example, if aggregate income
is $10 and the price of pizza is $2, then the
quantity of pizza demanded is 60 pies; if the
price of pizza rises to $3, the quantity of pizza demanded
falls to 50 pies.


Functional notation allows us to express a
relationship among variables even when the
precise numerical relationship is unknown. For
example, we might know that the quantity of
pizza demanded falls when the price rises from
$2 to $3, but we might not know by how much
it falls. In this case, functional notation is useful:
as long as we know that a relationship
among the variables exists, we can remind ourselves
of that relationship using functional
notation.

