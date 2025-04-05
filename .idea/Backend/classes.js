class Plan
{
    constructor(name, credits, list)
    {
        this.name = name;
        this.credits = credits;

        for(let i = 0; i < list.length; i++)
        {
            this.list[i] = new Course(list[i])
        }
    }

    init(list)
    {
        //i is the current course
        for(let i = 0; i < list.length; i++)
        {
            //x will be the amount of rows in the course's prereqs
            for(let x = 0; x < list[i].prereq.length; x++)
            {
                //z will be the column number in the prereq row
                for(let z = 0; z < list[i].prereq[x].length; z++)
                {
                    //y is going back through the main list's courses
                    for (let y = 0; y < list.length; y++)
                    {
                        if (list[y].name === list[i].prereq[x][z])
                        {
                            list[i].prereq[x][z] = list[y];
                            y = list.length;
                        }
                    }
                }
            }
        }
    }
}

class Course
{
    //example list:
    //name; course title; credits; prerequisites; description; professors;
    //CMSC 102; intro to computer science 2; 3; CMSC 101, TEST 101; Second CMSC intro class; John Smith, Jane Doe;
    constructor(list)
    {
        this.name = "";
        this.num = 0;
        this.title = "";
        let credittemp= "";
        this.credits = 0;
        let prereqtemp = "";
        this.prereq = [[]];
        this.description = "";
        let proftemp = "";
        this.professors = [];
        this.semester = 0;

        let holder = 0;
        for(let i = 0; i < list.length(); i++)
        {
            if(list.charAt(i) == ";")
            {
                holder++;
                i++;
            }
            else
            {
                switch (holder)
                {
                    case 0:
                        //finds the name of the course
                        this.name = this.name + list.charAt(i);
                        break;
                    case 1:
                        //finds the name of the course
                        this.title = this.title + list.charAt(i);
                        break;
                    case 2:
                        //finds the credit count of the course
                        credittemp = credittemp + list.charAt(i);
                        break;
                    case 3:
                        //finds the prereq temp
                        prereqtemp = prereqtemp + list.charAt(i);
                        break;
                    case 4:
                        //gets the description
                        this.description = this.description + list.charAt(i);
                        break;
                    case 5:
                        //gets the description
                        proftemp = proftemp + list.charAt(i);
                        break;
                    default:
                        // Code to be executed if none of the above cases are matched
                        break;
                }
            }
        }

        //decodes the credits and the prereqs
        this.num = Number(this.name.substring(this.name.length() - 2, this.name.length()));
        this.credits = +credittemp;

        //decodes prerequisites
        holder = 0;
        let orr = 0;
        for(let i = 0; i < prereqtemp.length(); i++)
        {
            if(prereqtemp.charAt(i) == ",")
            {
                holder++;
                i++;
            }
            else if(prereqtemp.charAt(i) == "|")
            {
                orr++;
                i++;
            }
            else
            {
                this.prereq[holder][orr] = this.prereq[holder][orr] + prereqtemp.charAt(i);
            }
        }

        //decodes professors
        holder = 0;
        for(let i = 0; i < proftemp.length(); i++)
        {
            if(proftemp.charAt(i) == ",")
            {
                holder++;
                i++;
            }
            else
            {
                this.professors[holder] = this.professors[holder] + proftemp.charAt(i);
            }
        }
    }
}
