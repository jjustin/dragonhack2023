
f = open("normalna.txt", "r")
normalnaTxt = f.readlines()
#print(normalnaTxt)
textForOut = ""

for line in normalnaTxt:
    #print(line)
    pisniLine = ""
    numOfSpaceBlocks=0
    trenutnoVSpaceBlock = False
    predTemSpace = True  #za zacetek linea mora tudi veljati, ker je fora v piki
    for char in line:
        if predTemSpace and char == "." :
            pisniLine += "0"

        if char == " ":
            predTemSpace = True
            if not trenutnoVSpaceBlock:
                numOfSpaceBlocks += 1
            trenutnoVSpaceBlock = True
        else:
            if(not numOfSpaceBlocks == 1 and not (numOfSpaceBlocks == 2)):
                if(predTemSpace and numOfSpaceBlocks == 3):
                    pisniLine += ", "
                if(not trenutnoVSpaceBlock):
                    pisniLine += char
            predTemSpace = False
            trenutnoVSpaceBlock = False
        
    pisniLine += "\n"
    textForOut += pisniLine

f2 = open("normalna.csv", "w")
f2.write(textForOut)


            