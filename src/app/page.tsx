"use client"

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useToast } from '@/hooks/use-toast'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Moon, Sun } from 'lucide-react'

export default function Component() {

  const { toast } = useToast()

  const [password, setPassword] = useState('')
  const [length, setLength] = useState(12)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'

    let chars = ''
    if (includeUppercase) chars += uppercase
    if (includeLowercase) chars += lowercase
    if (includeNumbers) chars += numbers
    if (includeSymbols) chars += symbols

    if (chars === '') {
      toast({
        title: "Error",
        description: "Please select at least one character type.",
        variant: "destructive",
      })
      return
    }

    let generatedPassword = ''
    for (let i = 0; i < length; i++) {
      generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setPassword(generatedPassword)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    toast({
      title: "Copied!",
      description: "Password copied to clipboard.",
    })
  }

  if (!mounted) return null

  return (
      <Card className="w-[350px]">
        <CardHeader className='flex flex-row justify-center items-center'>
          <CardTitle>Random Password Generator</CardTitle>
          <CardDescription><Select value={theme} onValueChange={setTheme}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">
                <div className="flex items-center">
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </div>
              </SelectItem>
              <SelectItem value="dark">
                <div className="flex items-center">
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </div>
              </SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="password">Generated Password</Label>
              <div className="flex mt-1">
                <Input
                  id="password"
                  value={password}
                  readOnly
                  className="flex-grow"
                />
                <Button onClick={copyToClipboard} className="ml-2">
                  Copy
                </Button>
              </div>
            </div>
            <div>
              <Label>Password Length: {length}</Label>
              <Slider
                value={[length]}
                onValueChange={(value) => setLength(value[0])}
                min={6}
                max={30}
                step={1}
                className="mt-1"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="uppercase"
                  checked={includeUppercase}
                  onCheckedChange={() => setIncludeUppercase(prev => prev = !includeUppercase)}
                />
                <Label htmlFor="uppercase">Include Uppercase</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lowercase"
                  checked={includeLowercase}
                  onCheckedChange={() => setIncludeLowercase(prev => prev = !includeLowercase)}
                />
                <Label htmlFor="lowercase">Include Lowercase</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="numbers"
                  checked={includeNumbers}
                  onCheckedChange={() => setIncludeNumbers(prev => prev = !includeNumbers)}
                />
                <Label htmlFor="numbers">Include Numbers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="symbols"
                  checked={includeSymbols}
                  onCheckedChange={() => setIncludeSymbols(prev => prev = !includeSymbols)}
                />
                <Label htmlFor="symbols">Include Symbols</Label>
              </div>
            </div>
            <Button onClick={generatePassword} className="w-full">
              Generate Password
            </Button>
          </div>
        </CardContent>
      </Card>
  )
}